'use client';

import React, { useState } from 'react';
import {
  MessageSquareIcon,
  SendIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@/components/Icons';

export default function SupportPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/zammad/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail: email,
          clientName: name || 'Client OLO',
          message,
          trackingCode: trackingCode || undefined
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(
          `Votre demande a été enregistrée avec succès sous la référence ${data.zammadTicketNumber || 'ACC-SUCCESS'} ! Un conseiller va vous contacter rapidement.`
        );
        setMessage('');
      } else {
        setErrorMsg(data.error || 'Erreur lors de l\'envoi de la demande.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-slate-900 text-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Centre d'Assistance Client</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Assistance & Service Client
        </h1>
        <p className="text-slate-400 text-sm">
          Une question sur votre dossier ? Notre équipe vous répond et vous accompagne à chaque étape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Support Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Envoyer un Message à l'Assistance</span>
            <MessageSquareIcon className="w-5 h-5 text-emerald-400" />
          </h3>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium leading-relaxed flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nom & Prénom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Nguema"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">E-mail *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Code de Dossier (Optionnel)</label>
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="ex: OLO-782910"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Votre Message *</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question ici..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <span>Transmission...</span>
            ) : (
              <>
                <SendIcon className="w-4 h-4" />
                <span>Envoyer au Service Client</span>
              </>
            )}
          </button>
        </form>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Service Client O'LO Hub
            </h4>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Disponibilité :</span>
              <span className="text-emerald-400 font-bold block">7j / 7 de 8h à 19h</span>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Toutes les demandes sont traitées par nos conseillers dédiés.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
