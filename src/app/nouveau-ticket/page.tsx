'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TicketIcon,
  CreditCardIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldIcon,
  ArrowRightIcon
} from '@/components/Icons';

const SERVICE_PRICES: Record<string, number> = {
  "ANPI (Création d'Entreprise)": 250000,
  "DGI (Impôts & Services fiscaux)": 150000,
  "CNSS (Sécurité Sociale)": 200000,
  "Légalisation de Documents": 50000,
  "Dossier de Douane & Import": 180000,
  "Agrément Technique": 220000
};

const CITY_PRICES: Record<string, number> = {
  "Libreville": 0,
  "Port-Gentil": 30000,
  "Franceville": 45000,
  "Oyem": 35000,
  "Lambaréné": 25000
};

export default function NouveauTicketPage() {
  const router = useRouter();
  
  const [service, setService] = useState("ANPI (Création d'Entreprise)");
  const [city, setCity] = useState("Libreville");
  const [urgency, setUrgency] = useState<'standard' | 'express'>("standard");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [description, setDescription] = useState("");
  const [payNow, setPayNow] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const basePrice = SERVICE_PRICES[service] || 150000;
  const cityPrice = CITY_PRICES[city] || 0;
  const urgencyPrice = urgency === 'express' ? 50000 : 0;
  const totalPrice = basePrice + cityPrice + urgencyPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      setError("Veuillez remplir les informations de contact (Nom, Email, Téléphone).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          service,
          description,
          city,
          urgency,
          payNow
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Erreur lors de la création du ticket.");
        setLoading(false);
        return;
      }

      const trackingCode = data.ticket.trackingCode;

      if (payNow && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        router.push(`/suivi/${trackingCode}?created=true`);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-slate-900 text-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Formulaire Officiel de Demande</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Initiation de Demande O'LO Hub
        </h1>
        <p className="text-slate-400 text-sm">
          Sélectionnez le service et renseignez vos informations. Un code de suivi unique vous sera délivré.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
          
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Section 1: Choix du Service */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Choix du Service *
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-medium"
            >
              {Object.keys(SERVICE_PRICES).map((svc) => (
                <option key={svc} value={svc}>
                  {svc} — {SERVICE_PRICES[svc].toLocaleString()} FCFA
                </option>
              ))}
            </select>
          </div>

          {/* Section 2: Ville et Urgence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Ville de Traitement *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {Object.keys(CITY_PRICES).map((c) => (
                  <option key={c} value={c}>
                    {c} {CITY_PRICES[c] > 0 ? `(+${CITY_PRICES[c].toLocaleString()} FCFA)` : '(Standard)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Modalité de Traitement *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    urgency === 'standard'
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('express')}
                  className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    urgency === 'express'
                      ? 'bg-amber-600 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Express (+50k FCFA)
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Vos coordonnées */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              2. Vos Coordonnées
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Jean-Marc Nguema"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Téléphone (Gabon +241) *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="077519644 ou 066000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Adresse E-mail *</label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="jean.nguema@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Précisions (Optionnel)</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Précisions sur votre demande..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Section 4: Règlement */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              3. Option de Règlement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setPayNow(true)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  payNow
                    ? 'bg-slate-800 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment_option"
                  checked={payNow}
                  onChange={() => setPayNow(true)}
                  className="mt-1 accent-emerald-400"
                />
                <div>
                  <span className="block text-xs font-bold text-emerald-400">Payer maintenant par Mobile Money</span>
                  <span className="text-[11px] text-slate-300">Règlement direct Airtel Money / Moov Money</span>
                </div>
              </label>

              <label
                onClick={() => setPayNow(false)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  !payNow
                    ? 'bg-slate-800 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment_option"
                  checked={!payNow}
                  onChange={() => setPayNow(false)}
                  className="mt-1 accent-emerald-400"
                />
                <div>
                  <span className="block text-xs font-bold text-slate-200">Payer plus tard</span>
                  <span className="text-[11px] text-slate-400">Régler depuis votre espace de suivi</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span>Traitement en cours...</span>
            ) : (
              <>
                <TicketIcon className="w-5 h-5" />
                <span>
                  {payNow ? 'Valider & Payer en Mobile Money' : 'Valider mon Ticket O\'LO'}
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Dynamic Pricing Summary Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 sticky top-28 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Récapitulatif</span>
              <span className="text-xs font-mono text-emerald-400">FCFA</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Tarif Base:</span>
                <span className="font-semibold text-slate-100">{basePrice.toLocaleString()} FCFA</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Ville ({city}):</span>
                <span className="font-semibold text-slate-100">
                  {cityPrice > 0 ? `+${cityPrice.toLocaleString()} FCFA` : 'Inclus'}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Traitement ({urgency}):</span>
                <span className="font-semibold text-slate-100">
                  {urgencyPrice > 0 ? `+${urgencyPrice.toLocaleString()} FCFA` : 'Inclus'}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Montant Total :</span>
                <span className="text-2xl font-extrabold text-emerald-400">{totalPrice.toLocaleString()} FCFA</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldIcon className="w-4 h-4" />
                <span>Règlement Sécurisé</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Reçu et quittance délivrés après validation du Mobile Money.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
