import { NextResponse } from 'next/server';
import { getTicketByCode, saveTicket } from '@/lib/tickets';

/**
 * Endpoint de Callback / Webhook eBilling DIGITECH
 * eBilling envoie une notification de paiement avec bill_id, client_transaction_id et status.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);

    if (!payload) {
      return NextResponse.json({ error: 'Payload vide' }, { status: 400 });
    }

    const trackingCode = payload.client_transaction_id || payload.external_reference;
    const status = payload.status || payload.state; // e.g. 'processed', 'paid', 'success'

    if (trackingCode) {
      const ticket = getTicketByCode(trackingCode);
      if (ticket) {
        if (['processed', 'paid', 'success', 'completed'].includes(String(status).toLowerCase())) {
          ticket.status = 'paid';
          ticket.progress = Math.max(ticket.progress, 30);
          ticket.updateText = 'Paiement eBilling (Airtel/Moov Money) validé avec succès. Traitement du dossier en cours.';
          ticket.paymentMethod = payload.payment_system || 'Mobile Money (eBilling)';
          saveTicket(ticket);
        }
      }
    }

    return NextResponse.json({ status: 'OK', message: 'Callback eBilling traité' });
  } catch (error) {
    console.error('Callback eBilling error:', error);
    return NextResponse.json({ error: 'Erreur traitement callback' }, { status: 500 });
  }
}
