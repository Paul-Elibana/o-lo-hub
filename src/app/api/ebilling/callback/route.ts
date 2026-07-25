import { NextResponse } from 'next/server';
import { getTicketByCodeAsync, saveTicket } from '@/lib/tickets';

/**
 * Endpoint de Callback / Webhook eBilling DIGITECH (Guide v1 - Page 10 & 11)
 * Paramètres reçus : reference, transactionid, paymentsystem, amount, billingid
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);

    if (!payload) {
      return NextResponse.json({ error: 'missing payload' }, { status: 400 });
    }

    const trackingCode = payload.reference || payload.external_reference || payload.client_transaction_id;
    const operator = payload.paymentsystem || payload.payment_system || 'Mobile Money (eBilling)';
    const billingId = payload.billingid || payload.bill_id;

    if (trackingCode) {
      const ticket = await getTicketByCodeAsync(trackingCode);
      if (ticket) {
        ticket.status = 'paid';
        ticket.progress = Math.max(ticket.progress, 35);
        ticket.updateText = `Paiement Mobile Money (${operator === 'moovmoney4' ? 'Moov Money' : 'Airtel Money'}) validé ! Traitement du dossier en cours.`;
        ticket.paymentMethod = operator === 'moovmoney4' ? 'Moov Money' : 'Airtel Money';
        if (billingId) {
          ticket.ebillingBillId = String(billingId);
        }
        saveTicket(ticket);
      }
    }

    // Guide Page 11: Retourner impérativement HTTP 200 avec { success: true }
    return NextResponse.json({ success: true, message: 'Callback eBilling traite' }, { status: 200 });
  } catch (error) {
    console.error('Callback eBilling error:', error);
    return NextResponse.json({ error: 'Erreur traitement callback' }, { status: 500 });
  }
}
