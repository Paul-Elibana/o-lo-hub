import { NextResponse } from 'next/server';
import { getTicketByCode, saveTicket } from '@/lib/tickets';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const resolvedParams = await params;
  const code = resolvedParams.code;
  const ticket = getTicketByCode(code);

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 });
  }

  return NextResponse.json({ success: true, ticket });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const resolvedParams = await params;
    const code = resolvedParams.code;
    const ticket = getTicketByCode(code);

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 });
    }

    const body = await request.json();
    const { action, status, documentLabel, fileName } = body;

    if (action === 'mark_paid') {
      ticket.status = 'paid';
      ticket.progress = Math.max(ticket.progress, 30);
      ticket.updateText = 'Paiement validé avec succès. Votre dossier est en cours de traitement par notre équipe.';
    } else if (action === 'add_document' && documentLabel && fileName) {
      ticket.documents.push({
        id: `doc-${Date.now()}`,
        label: documentLabel,
        fileName: fileName,
        uploadedAt: new Date().toISOString()
      });
      ticket.updateText = `Nouveau document ajouté : ${documentLabel}`;
    } else if (status) {
      ticket.status = status;
    }

    saveTicket(ticket);

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error('Update ticket error:', error);
    return NextResponse.json({ error: 'Erreur mise à jour ticket' }, { status: 500 });
  }
}
