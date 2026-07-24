import { NextResponse } from 'next/server';
import { createEBillingInvoice } from '@/lib/ebilling';
import { getTicketByCode, saveTicket } from '@/lib/tickets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trackingCode } = body;

    if (!trackingCode) {
      return NextResponse.json({ error: 'Tracking code required' }, { status: 400 });
    }

    const ticket = getTicketByCode(trackingCode);
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 });
    }

    const res = await createEBillingInvoice({
      invoiceNumber: ticket.trackingCode,
      clientName: ticket.clientName,
      clientEmail: ticket.clientEmail,
      clientPhone: ticket.clientPhone,
      amount: ticket.price,
      description: `Frais administrative OLO Hub - ${ticket.service}`
    });

    if (res.success && res.billId && res.paymentUrl) {
      ticket.ebillingBillId = res.billId;
      ticket.ebillingPaymentUrl = res.paymentUrl;
      ticket.paymentMethod = 'Mobile Money (eBilling)';
      saveTicket(ticket);

      return NextResponse.json({
        success: true,
        billId: res.billId,
        paymentUrl: res.paymentUrl
      });
    }

    return NextResponse.json({ error: res.error || 'Erreur création eBilling' }, { status: 500 });
  } catch (error) {
    console.error('API create-bill error:', error);
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 });
  }
}
