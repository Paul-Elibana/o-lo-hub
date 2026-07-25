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
  ClockIcon,
  FileTextIcon
} from '@/components/Icons';
import { OLO_HUBS } from '@/lib/hubs';
import { Ticket } from '@/lib/tickets';

export default function AdminBackofficePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [operatorFilter, setOperatorFilter] = useState<'all' | 'airtelmoney' | 'moovmoney4'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7days' | '30days'>('all');

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

  // Filtered Tickets Calculation
  const filteredTickets = tickets.filter((t) => {
    // Operator Filter
    if (operatorFilter !== 'all') {
      const phone = t.clientPhone || '';
      const isMoov = phone.startsWith('06') || phone.startsWith('6') || phone.includes('moov');
      const isAirtel = !isMoov;
      if (operatorFilter === 'moovmoney4' && !isMoov) return false;
      if (operatorFilter === 'airtelmoney' && !isAirtel) return false;
    }

    // Status Filter
    const isPaid = ['paid', 'processing', 'verifying', 'completed'].includes(t.status);
    if (statusFilter === 'paid' && !isPaid) return false;
    if (statusFilter === 'pending' && isPaid) return false;

    // Date Filter
    if (dateFilter !== 'all') {
      const ticketDate = new Date(t.createdAt).getTime();
      const now = Date.now();
      const dayMs = 24 * 60 * 60 * 1000;

      if (dateFilter === 'today' && now - ticketDate > dayMs) return false;
      if (dateFilter === '7days' && now - ticketDate > 7 * dayMs) return false;
      if (dateFilter === '30days' && now - ticketDate > 30 * dayMs) return false;
    }

    return true;
  });

  // Backoffice Stat calculations
  const totalTickets = filteredTickets.length;
  const paidTickets = filteredTickets.filter((t) => ['paid', 'processing', 'verifying', 'completed'].includes(t.status));
  const totalRevenue = paidTickets.reduce((acc, t) => acc + t.price, 0);

  // Revenue per hub platform calculation
  const hubStats = OLO_HUBS.map((hub) => {
    const count = filteredTickets.filter((t) => t.service.toLowerCase().includes(hub.slug) || hub.services.some(s => t.service.includes(s.name))).length;
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

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = ['Code Ticket,Date,Client,Email,Telephone,Service,Paiement,Montant FCFA,Statut'];
    const rows = filteredTickets.map((t) => {
      const isPaid = ['paid', 'processing', 'verifying', 'completed'].includes(t.status);
      const phone = t.clientPhone || '';
      const operator = (phone.startsWith('06') || phone.startsWith('6')) ? 'Moov Money' : 'Airtel Money';
      const statusText = isPaid ? 'PAYE' : 'EN ATTENTE';
      const dateStr = new Date(t.createdAt).toLocaleDateString('fr-FR');
      return `"${t.trackingCode}","${dateStr}","${t.clientName}","${t.clientEmail}","${t.clientPhone}","${t.service.replace(/"/g, '""')}","${operator}",${t.price},"${statusText}"`;
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bilan_financier_olo_hub_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Printable PDF Function
  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-slate-900 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChartIcon className="w-3.5 h-3.5" />
            <span>Tableau de Bord Backoffice</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Suivi Comptable & Bilans Financiers O'LO Hub</h1>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center gap-2"
          >
            <FileTextIcon className="w-4 h-4 text-emerald-400" />
            <span>Exporter en CSV</span>
          </button>

          <button
            onClick={exportToPDF}
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-colors flex items-center gap-2"
          >
            <FileTextIcon className="w-4 h-4" />
            <span>Imprimer Bilan PDF</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 print:hidden text-xs">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Operator Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Opérateur Mobile</label>
            <select
              value={operatorFilter}
              onChange={(e) => setOperatorFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Tous les opérateurs</option>
              <option value="airtelmoney">Airtel Money (077/074/076)</option>
              <option value="moovmoney4">Moov Money (066/062/065)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Statut Règlement</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="paid">Paiements Confirmés</option>
              <option value="pending">En Attente de Règlement</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Période</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="7days">7 derniers jours</option>
              <option value="30days">30 derniers jours</option>
            </select>
          </div>

        </div>

        <span className="text-xs font-mono text-slate-400">
          Résultats : <strong className="text-white">{filteredTickets.length}</strong> dossiers
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider font-mono">Revenu Total Filtré</span>
            <DollarSignIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{totalRevenue.toLocaleString()} FCFA</p>
          <p className="text-[11px] text-emerald-400">Paiements Mobile Money encaissés</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider font-mono">Demandes Filtrées</span>
            <TicketIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{totalTickets}</p>
          <p className="text-[11px] text-slate-400">Dossiers réorientés vers les agents</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider font-mono">Taux de Confirmation</span>
            <BuildingIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">
            {totalTickets > 0 ? Math.round((paidTickets.length / totalTickets) * 100) : 0}%
          </p>
          <p className="text-[11px] text-emerald-400">Ratio règlements validés / total</p>
        </div>
      </div>

      {/* Hubs Revenue Breakdown Table */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4 font-mono uppercase tracking-wider">
          Répartition des Encaissements par Hub / Plateforme
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono">
                <th className="pb-3 font-bold">Plateforme Hub</th>
                <th className="pb-3 font-bold">Frais de Dossier Fixes</th>
                <th className="pb-3 font-bold">Demandes</th>
                <th className="pb-3 font-bold">Total Frais Fixes</th>
                <th className="pb-3 font-bold">Revenu Total Généré</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {hubStats.map(({ hub, count, revenue, fraisDossierTotal }) => (
                <tr key={hub.id} className="hover:bg-slate-950/40">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{hub.name}</span>
                  </td>
                  <td className="py-4 text-slate-300">
                    {hub.fraisDeDossierFixe.toLocaleString()} FCFA
                  </td>
                  <td className="py-4 font-bold text-slate-100">{count}</td>
                  <td className="py-4 font-bold text-emerald-400">
                    {fraisDossierTotal.toLocaleString()} FCFA
                  </td>
                  <td className="py-4 font-extrabold text-white">
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
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4 font-mono uppercase tracking-wider">
          Journal Complet des Transactions & Règlements
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono">
                <th className="pb-3 font-bold">Code Ticket</th>
                <th className="pb-3 font-bold">Client / Téléphone</th>
                <th className="pb-3 font-bold">Démarche sollicitée</th>
                <th className="pb-3 font-bold">Opérateur Mobile</th>
                <th className="pb-3 font-bold">Montant</th>
                <th className="pb-3 font-bold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTickets.map((t) => {
                const isPaid = ['paid', 'processing', 'verifying', 'completed'].includes(t.status);
                const phone = t.clientPhone || '';
                const operator = (phone.startsWith('06') || phone.startsWith('6')) ? 'Moov Money' : 'Airtel Money';

                return (
                  <tr key={t.id} className="hover:bg-slate-950/40">
                    <td className="py-4 font-bold text-emerald-400">{t.trackingCode}</td>
                    <td className="py-4 text-slate-200">
                      <span className="font-bold block text-white">{t.clientName}</span>
                      <span className="text-[11px] text-slate-400">{t.clientPhone}</span>
                    </td>
                    <td className="py-4 text-slate-300 max-w-xs truncate">{t.service}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        operator === 'Moov Money' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {operator}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-white">{t.price.toLocaleString()} FCFA</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        isPaid ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {isPaid ? 'Règlement Confirmé' : 'En Attente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
