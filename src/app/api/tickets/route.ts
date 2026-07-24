import { NextResponse } from 'next/server';
import {
  getAllTickets,
  getTicketByCode,
  saveTicket,
  generateUniqueTrackingCode,
  SERVICE_PRICES,
  CITY_PRICES,
  URGENCY_PRICES,
  Ticket
} from '@/lib/tickets';
import { createEBillingInvoice } from '@/lib/ebilling';
import { createZammadTicket } from '@/lib/zammad';

export async function GET() {
  const tickets = getAllTickets();
  return NextResponse.json({ success: true, tickets });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      service,
      description,
      city,
      urgency = 'standard',
      payNow = false
    } = body;

    if (!clientName || !clientEmail || !clientPhone || !service || !city) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const basePrice = SERVICE_PRICES[service] || 150000;
    const cityPrice = CITY_PRICES[city] || 0;
    const urgencyPrice = URGENCY_PRICES[urgency] || 0;
    const totalPrice = basePrice + cityPrice + urgencyPrice;

    const trackingCode = generateUniqueTrackingCode();

    const initialStatus = payNow ? 'pending_payment' : 'pending_payment';
    const updateText = payNow
      ? 'Ticket créé. Redirection vers le paiement Mobile Money (eBilling)...'
      : 'Ticket créé. En attente de règlement.';

    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      trackingCode,
      clientName,
      clientEmail,
      clientPhone,
      service,
      description: description || '',
      city,
      urgency,
      price: totalPrice,
      status: initialStatus,
      paymentMethod: payNow ? 'eBilling Mobile Money' : 'Payer plus tard',
      progress: 15,
      updateText,
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Generate eBilling payment invoice
    const ebillingRes = await createEBillingInvoice({
      invoiceNumber: trackingCode,
      clientName,
      clientEmail,
      clientPhone,
      amount: totalPrice,
      description: `Frais de dossier OLO Hub (${service}) pour ${clientName}`
    });

    if (ebillingRes.success && ebillingRes.billId && ebillingRes.paymentUrl) {
      newTicket.ebillingBillId = ebillingRes.billId;
      newTicket.ebillingPaymentUrl = ebillingRes.paymentUrl;
    }

    // 2. Synchronize ticket with Zammad Customer Support API
    const zammadRes = await createZammadTicket({
      title: `[OLO Hub] Ticket ${trackingCode} - ${service}`,
      customerEmail: clientEmail,
      customerName: clientName,
      customerPhone: clientPhone,
      service,
      body: `Ville: ${city}\nUrgence: ${urgency}\nMontant: ${totalPrice} FCFA\nDescription: ${description || 'Aucune'}`,
      trackingCode
    });

    if (zammadRes.success && zammadRes.zammadTicketId) {
      newTicket.zammadTicketId = zammadRes.zammadTicketId;
      newTicket.zammadTicketNumber = zammadRes.zammadTicketNumber;
    }

    saveTicket(newTicket);

    return NextResponse.json({
      success: true,
      ticket: newTicket,
      paymentUrl: ebillingRes.paymentUrl
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du ticket' }, { status: 500 });
  }
}
