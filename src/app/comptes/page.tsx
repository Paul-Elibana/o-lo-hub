'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PhoneIcon,
  ShieldIcon,
  CreditCardIcon,
  TicketIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  MessageSquareIcon,
  ArrowRightIcon,
  BuildingIcon
} from '@/components/Icons';
import { loginOrRegisterByPhone, getUserByPhone, UserAccount, updateZammadToken } from '@/lib/accounts';
import { getAllTickets, Ticket } from '@/lib/tickets';

export default function ComptesPage() {
  const [phoneInput, setPhoneInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  const [activeTab, setActiveTab] = useState<'dossiers' | 'ebilling' | 'zammad' | 'profile'>('dossiers');
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [zammadTokenInput, setZammadTokenInput] = useState('');
  const [tokenSaveMsg, setTokenSaveMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem('olo_user_phone');
    if (savedPhone) {
      const user = getUserByPhone(savedPhone);
      if (user) {
        setCurrentUser(user);
        setZammadTokenInput(user.zammadToken || '');
      }
    }
  }, []);

  // Sync tickets matching current user phone
  useEffect(() => {
    if (currentUser) {
      const all = getAllTickets();
      const matched = all.filter(t => t.clientPhone.replace(/\s+/g, '') === currentUser.phone.replace(/\s+/g, ''));
      setUserTickets(matched.length > 0 ? matched : all); // Show matched or sample dossiers
    }
  }, [currentUser]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;

    const user = loginOrRegisterByPhone(phoneInput, fullNameInput);
    setCurrentUser(user);
    setZammadTokenInput(user.zammadToken || '');
    localStorage.setItem('olo_user_phone', user.phone);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('olo_user_phone');
  };

  const handleSaveZammadToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !zammadTokenInput) return;

    const updated = updateZammadToken(currentUser.phone, zammadTokenInput);
    if (updated) {
      setCurrentUser({ ...updated });
      setTokenSaveMsg('Jeton d\'accès Zammad mis à jour avec succès !');
      setTimeout(() => setTokenSaveMsg(''), 4000);
    }
  };

  // If not logged in, show Phone Authentication Form
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-8 bg-slate-900 text-slate-100">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <PhoneIcon className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Espace Compte Client</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connectez-vous à votre espace personnel avec votre numéro de téléphone (Airtel Money ou Moov Money).
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">
                Numéro de Téléphone Mobile Money *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="ex: 077519644 ou 066123456"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 font-mono text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <span className="text-[10px] text-slate-500">
                Airtel Money (077/074/076) ou Moov Money (066/062/065)
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">
                Nom & Prénom (Facultatif)
              </label>
              <input
                type="text"
                value={fullNameInput}
                onChange={(e) => setFullNameInput(e.target.value)}
                placeholder="ex: Jean-Marc Nguema"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Accéder à mon Espace Compte</span>
            </button>

          </form>

          {/* Direct Demo Login Helper */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
            <span className="text-[11px] text-slate-500 block">Compte Démo Rapide</span>
            <button
              type="button"
              onClick={() => {
                setPhoneInput('077519644');
                setFullNameInput('Jean-Marc Nguema');
                const user = loginOrRegisterByPhone('077519644', 'Jean-Marc Nguema');
                setCurrentUser(user);
                setZammadTokenInput(user.zammadToken || '');
                localStorage.setItem('olo_user_phone', user.phone);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700"
            >
              Tester avec 077519644 (Jean-Marc Nguema)
            </button>
          </div>

        </div>

      </div>
    );
  }

  // User is logged in: Display Dashboard
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-slate-900 text-slate-100">
      
      {/* Top Welcome Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-xl">
            {currentUser.fullName.substring(0, 2).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{currentUser.fullName}</h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                {currentUser.phone}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Membre O'LO Hub • {currentUser.email} • {currentUser.city}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors shrink-0"
        >
          Se Déconnecter
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center flex-wrap gap-2 border-b border-slate-800 pb-4">
        
        <button
          onClick={() => setActiveTab('dossiers')}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'dossiers'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FileTextIcon className="w-4 h-4" />
          <span>Mes Dossiers & Facilitations ({userTickets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ebilling')}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'ebilling'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <CreditCardIcon className="w-4 h-4" />
          <span>Reçus Mobile Money</span>
        </button>

        <button
          onClick={() => setActiveTab('zammad')}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'zammad'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <ShieldIcon className="w-4 h-4" />
          <span>Jeton d'Accès Zammad</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <PhoneIcon className="w-4 h-4" />
          <span>Profil & Contact</span>
        </button>

      </div>

      {/* Tab 1: Mes Dossiers */}
      {activeTab === 'dossiers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Historique de vos Démarches
            </h2>
            <Link
              href="/facilitation"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Nouvelle Facilitation</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTickets.map((t) => (
              <div key={t.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400">{t.trackingCode}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(t.trackingCode);
                        setCopiedCode(t.trackingCode);
                        setTimeout(() => setCopiedCode(''), 2000);
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:border-emerald-500 transition-all cursor-pointer"
                    >
                      {copiedCode === t.trackingCode ? '✓ Copié !' : 'Copier'}
                    </button>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    t.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {t.status === 'paid' ? 'Règlement Confirmé' : 'En Attente'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{t.service}</h3>
                  <p className="text-xs text-slate-400">{t.city} • {t.price.toLocaleString()} FCFA</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                  {t.updateText}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-slate-500">Progression : {t.progress}%</span>
                  <Link
                    href={`/suivi/${t.trackingCode}`}
                    className="px-3.5 py-1.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 flex items-center gap-1"
                  >
                    <span>Voir le dossier</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Reçus Mobile Money */}
      {activeTab === 'ebilling' && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Historique des Encaissements eBilling
          </h2>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3">N° Facture eBilling</th>
                    <th className="pb-3">Dossier</th>
                    <th className="pb-3">Opérateur</th>
                    <th className="pb-3">Montant</th>
                    <th className="pb-3 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {userTickets.map((t, idx) => (
                    <tr key={t.id}>
                      <td className="py-3.5 font-mono text-emerald-400">{t.ebillingBillId || `E_BILL_5550060${idx + 1}`}</td>
                      <td className="py-3.5 font-semibold text-white">{t.service}</td>
                      <td className="py-3.5 text-slate-300">{t.paymentMethod || 'Airtel Money (USSD Push)'}</td>
                      <td className="py-3.5 font-bold text-white">{t.price.toLocaleString()} FCFA</td>
                      <td className="py-3.5 text-right">
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Validé
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Jeton Zammad */}
      {activeTab === 'zammad' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Jeton d'Accès Personnel Zammad (HTTP Token Authentication)
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Votre jeton d'accès permet à votre compte O'LO Hub d'interagir directement avec l'API REST de support Zammad (<code>agengab.zammad.com</code>).
            </p>
          </div>

          <form onSubmit={handleSaveZammadToken} className="space-y-4 text-xs">
            {tokenSaveMsg && (
              <p className="text-xs text-emerald-400 font-semibold">{tokenSaveMsg}</p>
            )}

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">Jeton HTTP Token *</label>
              <input
                type="text"
                required
                value={zammadTokenInput}
                onChange={(e) => setZammadTokenInput(e.target.value)}
                placeholder="Exemple: tNuyYi9F5Mgv241SjJudOO9iBpJYkjDe7s0pCPLOOumrngGHDX1e7TU1RgAfwRzD"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 font-mono text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
            >
              Enregistrer le Jeton Zammad
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Profil */}
      {activeTab === 'profile' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Informations de Profil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Nom Complet</span>
              <span className="font-semibold text-white">{currentUser.fullName}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Téléphone Principal</span>
              <span className="font-mono font-bold text-emerald-400">{currentUser.phone}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Email de Contact</span>
              <span className="font-semibold text-white">{currentUser.email}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Ville de Résidence</span>
              <span className="font-semibold text-white">{currentUser.city}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
