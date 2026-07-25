import { NextResponse } from 'next/server';
import {
  getAllTicketsAsync,
  createTicketAsync,
  generateTrackingCode,
  Ticket
} from '@/lib/tickets';
import { createEBillingInvoice } from '@/lib/ebilling';
import { createZammadTicket } from '@/lib/zammad';

export async function GET() {
  const tickets = await getAllTicketsAsync();
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
      city = 'Libreville',
      urgency = 'standard',
      payNow = false,
      overridePrice
    } = body;

    if (!clientName || !clientEmail || !clientPhone || !service) {
      return NextResponse.json({ error: 'Champs obligatoires manquants (Nom, Email, Téléphone, Service)' }, { status: 400 });
    }

    const totalPrice = Number(overridePrice) || 25000;
    const trackingCode = generateTrackingCode();

    const initialStatus = 'pending_payment';
    const updateText = 'Dossier créé. Redirection vers le paiement Mobile Money (eBilling)...';

    const newTicketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'> = {
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
      paymentMethod: 'Mobile Money (eBilling)',
      progress: 15,
      updateText,
      documents: []
    };

    // 1. Generate eBilling payment invoice
    const ebillingRes = await createEBillingInvoice({
      invoiceNumber: trackingCode,
      clientName,
      clientEmail,
      clientPhone,
      amount: totalPrice,
      description: `Frais de dossier OLO Hub (${service})`
    });

    if (ebillingRes.success && ebillingRes.billId && ebillingRes.paymentUrl) {
      newTicketData.ebillingBillId = ebillingRes.billId;
      newTicketData.ebillingPaymentUrl = ebillingRes.paymentUrl;
    }

    // 2. Synchronize ticket with Zammad Customer Support API
    const zammadRes = await createZammadTicket({
      title: `[OLO Hub] Ticket ${trackingCode} - ${service}`,
      customerEmail: clientEmail,
      customerName: clientName,
      customerPhone: clientPhone,
      service,
      body: `Ville: ${city}\nMontant: ${totalPrice} FCFA\nDescription: ${description || 'Aucune'}`,
      trackingCode
    });

    if (zammadRes.success && zammadRes.zammadTicketId) {
      newTicketData.zammadTicketId = zammadRes.zammadTicketId;
      newTicketData.zammadTicketNumber = zammadRes.zammadTicketNumber;
    }

    const newTicket = await createTicketAsync(newTicketData);

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
