'use client';

import React, { useState } from 'react';
import { MessageSquareIcon, SendIcon, CheckCircleIcon } from './Icons';

interface ZammadWidgetProps {
  trackingCode?: string;
  clientEmail?: string;
  clientName?: string;
}

export function ZammadWidget({ trackingCode, clientEmail, clientName }: ZammadWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(clientEmail || '');
  const [name, setName] = useState(clientName || '');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/zammad/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingCode,
          clientEmail: email,
          clientName: name || 'Client OLO',
          message
        })
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
        setTicketNumber(data.zammadTicketNumber || 'ACC-SUCCESS');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xl shadow-emerald-900/30 hover:scale-105 transition-all duration-300 flex items-center gap-3 border border-emerald-500/40 group"
      >
        <MessageSquareIcon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">
          Assistance Client
        </span>
      </button>

      {/* Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl backdrop-blur-2xl p-6 text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <h3 className="text-sm font-bold text-white">Assistance O'LO Hub</h3>
                <p className="text-[11px] text-emerald-400">Agent en ligne pour vous répondre</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-lg font-bold p-1"
            >
              ✕
            </button>
          </div>

          {sent ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircleIcon className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-white">Demande Transmise !</h4>
              <p className="text-xs text-slate-300">
                Votre message a bien été pris en compte sous le N° <span className="text-emerald-400 font-mono font-bold">{ticketNumber}</span>. Un conseiller vous recontactera rapidement.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {trackingCode && (
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px]">
                  Demande liée au dossier : <strong>{trackingCode}</strong>
                </div>
              )}

              <div>
                <label className="block text-slate-400 mb-1">Votre Nom</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Nguema"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Votre E-mail *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Votre Message *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bonjour, j'ai une question concernant mon dossier..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    <span>Envoyer la demande</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
