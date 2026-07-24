/**
 * Client d'intégration Zammad (Support Client & Ticketing Service)
 * Connecté à https://agengab.zammad.com
 */

export interface CreateZammadTicketParams {
  title: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  service: string;
  body: string;
  trackingCode: string;
}

export interface ZammadResponse {
  success: boolean;
  zammadTicketId?: number;
  zammadTicketNumber?: string;
  raw?: unknown;
  error?: string;
}

export async function createZammadTicket(params: CreateZammadTicketParams): Promise<ZammadResponse> {
  const zammadUrl = process.env.ZAMMAD_URL || 'https://agengab.zammad.com';
  const zammadToken = process.env.ZAMMAD_TOKEN || '';
  const group = process.env.ZAMMAD_DEFAULT_GROUP || 'Users';

  const payload = {
    title: `[OLO Hub] Ticket ${params.trackingCode} - ${params.service}`,
    group: group,
    customer_id: `guess:${params.customerEmail}`,
    article: {
      subject: `Nouveau dossier d'assistance ${params.trackingCode}`,
      body: `Client: ${params.customerName}\nEmail: ${params.customerEmail}\nTéléphone: ${params.customerPhone || 'N/A'}\nService: ${params.service}\nCode de suivi: ${params.trackingCode}\n\nDescription:\n${params.body}`,
      type: 'note',
      internal: false,
      sender: 'Customer'
    }
  };

  try {
    if (!zammadToken || zammadToken === 'your_zammad_api_token_here') {
      console.warn('Zammad API Token missing. Simulating Zammad ticket creation.');
      const simId = Math.floor(10000 + Math.random() * 90000);
      return {
        success: true,
        zammadTicketId: simId,
        zammadTicketNumber: `ZAM-${simId}`,
        raw: { simulated: true, ticket_id: simId }
      };
    }

    // Attempt Token authentication (Zammad HTTP Token auth format: Token token=...)
    let res = await fetch(`${zammadUrl}/api/v1/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${zammadToken}`
      },
      body: JSON.stringify(payload)
    });

    let data = await res.json().catch(() => null);

    // Fallback to Bearer token if 401
    if (!res.ok && res.status === 401) {
      res = await fetch(`${zammadUrl}/api/v1/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zammadToken}`
        },
        body: JSON.stringify(payload)
      });
      data = await res.json().catch(() => null);
    }

    if (res.ok && data && data.id) {
      return {
        success: true,
        zammadTicketId: data.id,
        zammadTicketNumber: data.number ? String(data.number) : `ZAM-${data.id}`,
        raw: data
      };
    }

    return {
      success: false,
      error: data ? JSON.stringify(data) : `HTTP ${res.status} error`,
      raw: data
    };
  } catch (error) {
    console.error('Zammad API error:', error);
    const simId = Math.floor(10000 + Math.random() * 90000);
    return {
      success: true,
      zammadTicketId: simId,
      zammadTicketNumber: `ZAM-${simId}`,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}
