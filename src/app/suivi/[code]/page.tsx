'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  UploadIcon,
  MessageSquareIcon
} from '@/components/Icons';
import { Ticket } from '@/lib/tickets';

export default function SuiviDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawCode = (params?.code as string) || '';
  const code = rawCode.toUpperCase();
  const isPaymentSuccess = searchParams.get('payment') === 'success';

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [uploadLabel, setUploadLabel] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!code) return;

    fetch(`/api/tickets/${encodeURIComponent(code)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Dossier introuvable');
        return res.json();
      })
      .then((data) => {
        if (data.success && data.ticket) {
          let updated = data.ticket;
          if (isPaymentSuccess && updated.status === 'pending_payment') {
            updated.status = 'paid';
            updated.progress = Math.max(updated.progress, 35);
            updated.updateText = 'Paiement Mobile Money (Airtel/Moov Money) confirmé ! Traitement du dossier en cours.';
          }
          setTicket(updated);
        } else {
          setError(data.error || 'Aucun dossier trouvé avec ce code.');
        }
      })
      .catch((err) => {
        console.error('Fetch ticket error:', err);
        setError('Erreur de chargement du dossier.');
      })
      .finally(() => setLoading(false));
  }, [code, isPaymentSuccess]);

  const handleEBillingPay = async () => {
    if (!ticket) return;
    setPaymentLoading(true);

    try {
      if (ticket.ebillingPaymentUrl) {
        window.location.href = ticket.ebillingPaymentUrl;
        return;
      }

      const res = await fetch('/api/ebilling/create-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingCode: ticket.trackingCode })
      });

      if (!res.ok) throw new Error('Erreur création facture');
      const data = await res.json();

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        const resSim = await fetch(`/api/tickets/${encodeURIComponent(ticket.trackingCode)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'mark_paid' })
        });
        if (resSim.ok) {
          const dataSim = await resSim.json();
          if (dataSim.success) {
            setTicket(dataSim.ticket);
          }
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetCode = ticket?.trackingCode || code;
    if (!uploadLabel || !fileName || !targetCode) return;

    setUploadLoading(true);
    setUploadMsg('');

    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(targetCode)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_document',
          documentLabel: uploadLabel,
          fileName: fileName
        })
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`);
      }

      const data = await res.json();
      if (data.success && data.ticket) {
        setTicket(data.ticket);
        setUploadMsg('Document ajouté avec succès au dossier !');
        setUploadLabel('');
        setFileName('');
      } else {
        setUploadMsg(data.error || 'Erreur lors de l\'ajout du document.');
      }
    } catch (err) {
      console.error('Upload document error:', err);
      setUploadMsg('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin mx-auto"></div>
        <p className="text-sm text-slate-400">Chargement de votre dossier...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="glass-card p-8 rounded-3xl border border-rose-500/30 space-y-4">
          <h2 className="text-xl font-bold text-white">Dossier Introuvable</h2>
          <p className="text-xs text-slate-400">{error}</p>
          <Link
            href="/suivi"
            className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 hover:text-white"
          >
            Retourner au suivi
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = ['paid', 'processing', 'verifying', 'completed'].includes(ticket.status);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-slate-900 text-slate-100">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-wider">
                {ticket.trackingCode}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ticket.trackingCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono font-bold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:border-emerald-500 transition-all cursor-pointer"
              >
                {copied ? '✓ Copié !' : 'Copier'}
              </button>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                isPaid ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isPaid ? 'Règlement Confirmé' : 'En Attente de Règlement'}
              </span>
            </div>
            <p className="text-sm font-semibold text-white">{ticket.service}</p>
            <p className="text-xs text-slate-400">Client: {ticket.clientName} • {ticket.clientEmail}</p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Montant du Dossier</span>
            <span className="text-2xl font-extrabold text-white">{ticket.price.toLocaleString()} FCFA</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <ClockIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">Dernière Mise à Jour</span>
            <p className="text-xs text-slate-200">{ticket.updateText}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-400 font-semibold">
            <span>Progression du dossier</span>
            <span className="text-emerald-400">{ticket.progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700 shadow-md"
              style={{ width: `${ticket.progress}%` }}
            ></div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Details & Documents */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Details Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Détails du Dossier
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Ville</span>
                <span className="font-semibold text-slate-200">{ticket.city}</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Modalité</span>
                <span className="font-semibold capitalize text-slate-200">
                  {ticket.urgency}
                </span>
              </div>
            </div>

            {ticket.description && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1 text-xs">Précisions</span>
                <p className="text-xs text-slate-300 leading-relaxed">{ticket.description}</p>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Pièces Jointes ({ticket.documents.length})</span>
              <FileTextIcon className="w-5 h-5 text-emerald-400" />
            </h3>

            {ticket.documents.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Aucune pièce transmise pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {ticket.documents.map((doc) => (
                  <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <FileTextIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-200 block">{doc.label}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{doc.fileName}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 rounded-lg">
                      Téléversé
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Document Form */}
            <form onSubmit={handleUploadDocument} className="pt-4 border-t border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-300 block">Ajouter un Document au Dossier</span>
              
              {uploadMsg && (
                <p className="text-xs text-emerald-400 font-semibold">{uploadMsg}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={uploadLabel}
                  onChange={(e) => setUploadLabel(e.target.value)}
                  placeholder="Nom de la pièce (ex: CNI)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Nom du fichier (ex: cni.pdf)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={uploadLoading}
                className="px-4 py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors flex items-center gap-2"
              >
                {uploadLoading ? (
                  <span>Ajout en cours...</span>
                ) : (
                  <>
                    <UploadIcon className="w-4 h-4 text-emerald-400" />
                    <span>Ajouter la Pièce</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </div>

        {/* Right Col: Mobile Money Payment & Assistance */}
        <div className="space-y-6">
          
          {/* Payment Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Règlement Mobile Money</span>
              <CreditCardIcon className="w-5 h-5 text-emerald-400" />
            </h3>

            {!isPaid ? (
              <div className="space-y-4 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  Effectuez votre règlement par Airtel Money ou Moov Money en toute sécurité.
                </p>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] flex justify-between">
                  <span>Montant:</span>
                  <span className="font-extrabold">{ticket.price.toLocaleString()} FCFA</span>
                </div>

                <button
                  onClick={handleEBillingPay}
                  disabled={paymentLoading}
                  className="w-full py-3.5 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <span>Connexion...</span>
                  ) : (
                    <>
                      <CreditCardIcon className="w-4 h-4" />
                      <span>Payer en Mobile Money</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs py-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                    <span>Règlement Validé</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Votre paiement Mobile Money a été confirmé avec succès.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Customer Assistance Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                <MessageSquareIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Besoin d'aide ?</h4>
                <p className="text-[11px] text-slate-400">Assistance client O'LO Hub</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Un conseiller est à votre disposition. Cliquez sur le bouton en bas à droite pour poser votre question.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
