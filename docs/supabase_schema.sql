-- Schema SQL pour la base de données Supabase PostgreSQL O'LO Hub Gabon

-- 1. Table des Tickets & Dossiers
CREATE TABLE IF NOT EXISTS public.tickets (
    id TEXT PRIMARY KEY,
    tracking_code TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    service TEXT NOT NULL,
    description TEXT,
    city TEXT DEFAULT 'Libreville',
    status TEXT DEFAULT 'pending_payment',
    price NUMERIC DEFAULT 25000,
    progress INTEGER DEFAULT 15,
    update_text TEXT,
    ebilling_bill_id TEXT,
    ebilling_payment_url TEXT,
    zammad_ticket_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexation pour recherche rapide par code de suivi OLO-XXXXXX
CREATE INDEX IF NOT EXISTS idx_tickets_tracking_code ON public.tickets(tracking_code);
CREATE INDEX IF NOT EXISTS idx_tickets_client_phone ON public.tickets(client_phone);

-- 2. Table des Comptes Clients (Authentification par Numéro Mobile Money)
CREATE TABLE IF NOT EXISTS public.user_accounts (
    id TEXT PRIMARY KEY,
    phone_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT DEFAULT 'Libreville',
    zammad_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexation par numéro de téléphone
CREATE INDEX IF NOT EXISTS idx_user_accounts_phone ON public.user_accounts(phone_number);
