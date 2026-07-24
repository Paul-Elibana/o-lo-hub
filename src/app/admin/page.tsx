'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChartIcon,
  DollarSignIcon,
  TicketIcon,
  CheckCircleIcon,
  BuildingIcon,
  BriefcaseIcon,
  ScaleIcon,
  WheatIcon,
  ClockIcon
} from '@/components/Icons';
import { OLO_HUBS } from '@/lib/hubs';
import { Ticket } from '@/lib/tickets';

export default function AdminBackofficePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tickets')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tickets) {
          setTickets(data.tickets);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Backoffice Stat calculations
  const totalTickets = tickets.length;
  const paidTickets = tickets.filter((t) => ['paid', 'processing', 'verifying', 'completed'].includes(t.status));
  const totalRevenue = paidTickets.reduce((acc, t) => acc + t.price, 0);

  // Revenue per hub platform calculation
  const hubStats = OLO_HUBS.map((hub) => {
    const count = tickets.filter((t) => t.service.toLowerCase().includes(hub.slug) || hub.services.some(s => t.service.includes(s.name))).length;
    const revenue = paidTickets
      .filter((t) => t.service.toLowerCase().includes(hub.slug) || hub.services.some(s => t.service.includes(s.name)))
      .reduce((acc, t) => acc + t.price, 0);
    const fraisDossierTotal = count * hub.fraisDeDossierFixe;

    return {
      hub,
      count,
      revenue,
      fraisDossierTotal
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-slate-900 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChartIcon className="w-3.5 h-3.5" />
            <span>Tableau de Bord Backoffice</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Suivi des Hubs & Revenus O'LO</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-emerald-400">
            {paidTickets.length} Paiements Validés
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Revenu Total Généré</span>
            <DollarSignIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalRevenue.toLocaleString()} FCFA</p>
          <p className="text-[11px] text-emerald-400">Paiements obligatoires encaissés</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Total Demandes Sollicitées</span>
            <TicketIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalTickets}</p>
          <p className="text-[11px] text-slate-400">Tickets générés et réorientés</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Hubs Plateformes Actifs</span>
            <BuildingIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{OLO_HUBS.length}</p>
          <p className="text-[11px] text-emerald-400">Plateformes avec frais de dossier fixes</p>
        </div>
      </div>

      {/* Hubs Revenue Breakdown Table */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
          Statistiques & Revenus par Plateforme / Hub
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-bold">Plateforme Hub</th>
                <th className="pb-3 font-bold">Frais de Dossier Fixes</th>
                <th className="pb-3 font-bold">Demandes</th>
                <th className="pb-3 font-bold">Total Frais Encaissés</th>
                <th className="pb-3 font-bold">Revenu Total Généré</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {hubStats.map(({ hub, count, revenue, fraisDossierTotal }) => (
                <tr key={hub.id} className="hover:bg-slate-950/40">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{hub.name}</span>
                  </td>
                  <td className="py-4 font-mono text-slate-300">
                    {hub.fraisDeDossierFixe.toLocaleString()} FCFA
                  </td>
                  <td className="py-4 font-bold text-slate-100">{count}</td>
                  <td className="py-4 font-mono font-bold text-emerald-400">
                    {fraisDossierTotal.toLocaleString()} FCFA
                  </td>
                  <td className="py-4 font-mono font-extrabold text-white">
                    {revenue.toLocaleString()} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
          Journal des Demandes Récents
        </h3>

        {loading ? (
          <p className="text-xs text-slate-400">Chargement des données...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-bold">Code Ticket</th>
                  <th className="pb-3 font-bold">Client</th>
                  <th className="pb-3 font-bold">Service</th>
                  <th className="pb-3 font-bold">Montant</th>
                  <th className="pb-3 font-bold">Statut Règlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-950/40">
                    <td className="py-3 font-mono font-bold text-emerald-400">{t.trackingCode}</td>
                    <td className="py-3 text-slate-200">{t.clientName}</td>
                    <td className="py-3 text-slate-300">{t.service}</td>
                    <td className="py-3 font-mono font-bold text-white">{t.price.toLocaleString()} FCFA</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                        ['paid', 'processing', 'completed'].includes(t.status)
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {['paid', 'processing', 'completed'].includes(t.status) ? 'Payé' : 'En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
