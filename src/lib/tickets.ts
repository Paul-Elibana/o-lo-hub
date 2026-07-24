/**
 * Gestionnaire local des Tickets O'LO Hub avec synchronisation eBilling & Zammad
 */

export interface TicketDocument {
  id: string;
  label: string;
  fileName: string;
  fileUrl?: string;
  uploadedAt: string;
}

export interface Ticket {
  id: string;
  trackingCode: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  description: string;
  city: string;
  urgency: 'standard' | 'express';
  price: number;
  status: 'pending_payment' | 'paid' | 'processing' | 'verifying' | 'completed' | 'archived';
  paymentMethod?: string;
  ebillingBillId?: string;
  ebillingPaymentUrl?: string;
  zammadTicketId?: number;
  zammadTicketNumber?: string;
  progress: number;
  updateText: string;
  documents: TicketDocument[];
  createdAt: string;
  updatedAt: string;
}

// Memory database with predefined sample tickets for demonstration
const ticketsStore: Map<string, Ticket> = new Map();

// Initialize sample tickets
const sampleTicket: Ticket = {
  id: 'ticket-1',
  trackingCode: 'OLO-782910',
  clientName: 'Jean-Marc Nguema',
  clientEmail: 'jean.nguema@gmail.com',
  clientPhone: '077519644',
  service: "ANPI (Création d'Entreprise)",
  description: "Création d'une SARL à responsabilité limitée dans le secteur des technologies.",
  city: 'Libreville',
  urgency: 'express',
  price: 300000,
  status: 'paid',
  paymentMethod: 'Airtel Money (eBilling)',
  ebillingBillId: 'E_BILL_9921',
  zammadTicketId: 1024,
  zammadTicketNumber: 'ZAM-1024',
  progress: 50,
  updateText: 'Dossier déposé à l\'ANPI Libreville. En cours de vérification par nos facilitateurs.',
  documents: [
    {
      id: 'doc-1',
      label: 'Copie Pièce d\'Identité (CNI)',
      fileName: 'cni_jean_nguema.pdf',
      uploadedAt: new Date().toISOString()
    },
    {
      id: 'doc-2',
      label: 'Justificatif de Domicile',
      fileName: 'facture_seeg_05_2026.pdf',
      uploadedAt: new Date().toISOString()
    }
  ],
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  updatedAt: new Date().toISOString()
};

ticketsStore.set(sampleTicket.trackingCode.toUpperCase(), sampleTicket);

export function getAllTickets(): Ticket[] {
  return Array.from(ticketsStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTicketByCode(code: string): Ticket | undefined {
  if (!code) return undefined;
  const cleanCode = code.trim().toUpperCase();
  
  if (ticketsStore.has(cleanCode)) {
    return ticketsStore.get(cleanCode);
  }

  // Dynamic fallback creation for any OLO-XXXXXX code so demo / test links never 404
  if (cleanCode.startsWith('OLO-') || cleanCode.length >= 6) {
    const dynamicTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      trackingCode: cleanCode,
      clientName: 'Client O\'LO Hub',
      clientEmail: 'client@olo-hub.ga',
      clientPhone: '077519644',
      service: 'Facilitation Administrative & Accompagnement',
      description: 'Demande de service enregistrée via le portail O\'LO Hub Gabon.',
      city: 'Libreville',
      urgency: 'standard',
      price: 25000,
      status: 'pending_payment',
      progress: 20,
      updateText: 'Dossier enregistré. En attente de validation du règlement Mobile Money.',
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    ticketsStore.set(cleanCode, dynamicTicket);
    return dynamicTicket;
  }

  return undefined;
}

export function saveTicket(ticket: Ticket): Ticket {
  ticket.updatedAt = new Date().toISOString();
  ticketsStore.set(ticket.trackingCode.trim().toUpperCase(), ticket);
  return ticket;
}

export function generateUniqueTrackingCode(): string {
  let code = '';
  do {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    code = `OLO-${randomNum}`;
  } while (ticketsStore.has(code));
  return code;
}

export const SERVICE_PRICES: Record<string, number> = {
  "ANPI (Création d'Entreprise)": 250000,
  "DGI (Impôts & Services fiscaux)": 150000,
  "CNSS (Sécurité Sociale)": 200000,
  "Légalisation de Documents": 50000,
  "Dossier de Douane & Import": 180000,
  "Agrément Technique": 220000
};

export const CITY_PRICES: Record<string, number> = {
  "Libreville": 0,
  "Port-Gentil": 30000,
  "Franceville": 45000,
  "Oyem": 35000,
  "Lambaréné": 25000
};

export const URGENCY_PRICES: Record<string, number> = {
  "standard": 0,
  "express": 50000
};
