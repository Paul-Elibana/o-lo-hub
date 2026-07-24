import { NextResponse } from 'next/server';
import { createZammadTicket } from '@/lib/zammad';
import { getTicketByCode } from '@/lib/tickets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trackingCode, message, clientEmail, clientName, service } = body;

    let targetEmail = clientEmail;
    let targetName = clientName;
    let targetService = service || 'Assistance générale';

    if (trackingCode) {
      const existing = getTicketByCode(trackingCode);
      if (existing) {
        targetEmail = existing.clientEmail;
        targetName = existing.clientName;
        targetService = existing.service;
      }
    }

    if (!targetEmail || !message) {
      return NextResponse.json({ error: 'Email et message obligatoires' }, { status: 400 });
    }

    const res = await createZammadTicket({
      title: trackingCode ? `[Demande Support] ${trackingCode}` : `[Assistance Client] ${targetName}`,
      customerEmail: targetEmail,
      customerName: targetName || 'Client OLO',
      service: targetService,
      body: message,
      trackingCode: trackingCode || 'GEN-SUPPORT'
    });

    if (res.success) {
      return NextResponse.json({
        success: true,
        zammadTicketId: res.zammadTicketId,
        zammadTicketNumber: res.zammadTicketNumber
      });
    }

    return NextResponse.json({ error: res.error || 'Erreur création ticket Zammad' }, { status: 500 });
  } catch (error) {
    console.error('Zammad route error:', error);
    return NextResponse.json({ error: 'Erreur serveur Zammad' }, { status: 500 });
  }
}
