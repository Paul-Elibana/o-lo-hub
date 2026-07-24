'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchIcon, TicketIcon, ArrowRightIcon, SparklesIcon } from '@/components/Icons';

export default function SuiviPage() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/suivi/${code.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Search Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Portail de Suivi en Temps Réel</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Suivez l'Avancement de Votre Dossier
        </h1>
        <p className="text-slate-400 text-sm">
          Saisissez votre code unique de suivi (ex: <span className="text-emerald-400 font-mono font-bold">OLO-782910</span>) pour consulter le statut, effectuer le règlement eBilling ou télécharger vos pièces.
        </p>
      </div>

      {/* Search Bar Input */}
      <form onSubmit={handleSearch} className="glass-card p-4 sm:p-6 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <SearchIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Saisissez votre code (ex: OLO-782910)"
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-base font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors uppercase tracking-wider"
          />
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-2xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 shrink-0"
        >
          <span>Rechercher</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Test Demo Cards */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Exemple de Ticket de Démo
        </h3>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-emerald-400">OLO-782910</span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300">
                Paiement Validé (eBilling)
              </span>
            </div>
            <p className="text-xs text-slate-400">ANPI - Création d'Entreprise SARL (Jean-Marc Nguema)</p>
          </div>

          <Link
            href="/suivi/OLO-782910"
            className="px-4 py-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-colors flex items-center gap-1"
          >
            <span>Voir Détail</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
