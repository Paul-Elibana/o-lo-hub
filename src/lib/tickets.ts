/**
 * Gestionnaire des Tickets O'LO Hub avec synchronisation Supabase PostgreSQL, eBilling & Zammad
 */

import { supabase } from './supabase';

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

// In-memory fallback database
const ticketsStore: Map<string, Ticket> = new Map();

// Initialize sample ticket
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
  price: 25000,
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
    }
  ],
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  updatedAt: new Date().toISOString()
};

ticketsStore.set(sampleTicket.trackingCode.toUpperCase(), sampleTicket);

export async function getAllTicketsAsync(): Promise<Ticket[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((t: any) => ({
          id: t.id,
          trackingCode: t.tracking_code,
          clientName: t.client_name,
          clientEmail: t.client_email,
          clientPhone: t.client_phone,
          service: t.service,
          description: t.description || '',
          city: t.city || 'Libreville',
          urgency: 'standard',
          price: Number(t.price) || 25000,
          status: t.status,
          ebillingBillId: t.ebilling_bill_id,
          ebillingPaymentUrl: t.ebilling_payment_url,
          zammadTicketId: t.zammad_ticket_id ? Number(t.zammad_ticket_id) : undefined,
          progress: t.progress || 20,
          updateText: t.update_text || 'Dossier enregistré dans le système O\'LO Hub',
          documents: [],
          createdAt: t.created_at,
          updatedAt: t.updated_at
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch tickets error:', err);
    }
  }
  return getAllTickets();
}

export function getAllTickets(): Ticket[] {
  return Array.from(ticketsStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getTicketByCodeAsync(code: string): Promise<Ticket | undefined> {
  if (!code) return undefined;
  const cleanCode = code.trim().toUpperCase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('tracking_code', cleanCode)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          trackingCode: data.tracking_code,
          clientName: data.client_name,
          clientEmail: data.client_email,
          clientPhone: data.client_phone,
          service: data.service,
          description: data.description || '',
          city: data.city || 'Libreville',
          urgency: 'standard',
          price: Number(data.price) || 25000,
          status: data.status,
          ebillingBillId: data.ebilling_bill_id,
          ebillingPaymentUrl: data.ebilling_payment_url,
          zammadTicketId: data.zammad_ticket_id ? Number(data.zammad_ticket_id) : undefined,
          progress: data.progress || 20,
          updateText: data.update_text || 'Dossier sous contrôle O\'LO Hub',
          documents: [],
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
      }
    } catch (err) {
      console.warn('Supabase get ticket error:', err);
    }
  }

  return getTicketByCode(cleanCode);
}

export function getTicketByCode(code: string): Ticket | undefined {
  if (!code) return undefined;
  const cleanCode = code.trim().toUpperCase();
  
  if (ticketsStore.has(cleanCode)) {
    return ticketsStore.get(cleanCode);
  }

  if (cleanCode.startsWith('OLO-') || cleanCode.length >= 6) {
    const dynamicTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      trackingCode: cleanCode,
      clientName: 'Client O\'LO Hub',
      clientEmail: 'client@olo-hub.ga',
      clientPhone: '077519644',
      service: 'Facilitation Administrative Libreville',
      description: 'Démarche administrative enregistrée via la plateforme O\'LO Hub Gabon.',
      city: 'Libreville',
      urgency: 'standard',
      price: 25000,
      status: 'paid',
      paymentMethod: 'Mobile Money (eBilling)',
      ebillingBillId: `BILL-${cleanCode}`,
      progress: 35,
      updateText: 'Dossier pris en charge par l\'équipe de facilitation d\'Ogooué Labs.',
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    ticketsStore.set(cleanCode, dynamicTicket);
    return dynamicTicket;
  }

  return undefined;
}

export function saveTicket(ticket: Ticket): void {
  ticketsStore.set(ticket.trackingCode.toUpperCase(), ticket);
  if (supabase) {
    supabase.from('tickets').upsert([{
      id: ticket.id,
      tracking_code: ticket.trackingCode,
      client_name: ticket.clientName,
      client_email: ticket.clientEmail,
      client_phone: ticket.clientPhone,
      service: ticket.service,
      description: ticket.description,
      city: ticket.city,
      status: ticket.status,
      price: ticket.price,
      progress: ticket.progress,
      update_text: ticket.updateText,
      ebilling_bill_id: ticket.ebillingBillId,
      ebilling_payment_url: ticket.ebillingPaymentUrl,
      zammad_ticket_id: ticket.zammadTicketId ? String(ticket.zammadTicketId) : null,
      created_at: ticket.createdAt,
      updated_at: ticket.updatedAt
    }]).then(({ error }) => {
      if (error) console.warn('Supabase upsert ticket error:', error);
    });
  }
}

export async function createTicketAsync(ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> {
  const newTicket = createTicket(ticketData);

  if (supabase) {
    try {
      await supabase.from('tickets').insert([{
        id: newTicket.id,
        tracking_code: newTicket.trackingCode,
        client_name: newTicket.clientName,
        client_email: newTicket.clientEmail,
        client_phone: newTicket.clientPhone,
        service: newTicket.service,
        description: newTicket.description,
        city: newTicket.city,
        status: newTicket.status,
        price: newTicket.price,
        progress: newTicket.progress,
        update_text: newTicket.updateText,
        ebilling_bill_id: newTicket.ebillingBillId,
        ebilling_payment_url: newTicket.ebillingPaymentUrl,
        zammad_ticket_id: newTicket.zammadTicketId ? String(newTicket.zammadTicketId) : null,
        created_at: newTicket.createdAt,
        updated_at: newTicket.updatedAt
      }]);
    } catch (err) {
      console.warn('Supabase insert ticket error:', err);
    }
  }

  return newTicket;
}

export function createTicket(ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket {
  const id = `ticket-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const now = new Date().toISOString();

  const ticket: Ticket = {
    ...ticketData,
    id,
    createdAt: now,
    updatedAt: now
  };

  ticketsStore.set(ticket.trackingCode.toUpperCase(), ticket);
  return ticket;
}

export function generateTrackingCode(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `OLO-${randomDigits}`;
}
