'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  BuildingIcon,
  BriefcaseIcon,
  ScaleIcon,
  ShieldIcon,
  CreditCardIcon,
  TicketIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  FileTextIcon,
  UploadIcon,
  SparklesIcon,
  PhoneIcon
} from '@/components/Icons';

export interface AdministrativeDemarche {
  id: string;
  pole: string;
  title: string;
  description: string;
  fraisDossier: number;
  delaiEstime: string;
  documentsRequis: string[];
  iconName: string;
}

const DEMARCHES_FACILITATION: AdministrativeDemarche[] = [
  {
    id: 'anpi-creation',
    pole: 'Pôle ANPI (Création d\'Entreprise)',
    title: 'Création Complète d\'Entreprise (SARL / SUARL / EI)',
    description: 'Immatriculation au Registre du Commerce (RCCM), obtention du NIF et publication de l\'annonce légale.',
    fraisDossier: 25000,
    delaiEstime: '72 heures ouvrables',
    documentsRequis: ['Pièce d\'identité du gérant (CNI / Passeport)', 'Justificatif de domicile', 'Casier judiciaire (- 3 mois)'],
    iconName: 'BuildingIcon'
  },
  {
    id: 'dgi-quitus',
    pole: 'Pôle DGI (Impôts & Fiscalité)',
    title: 'Obtention du Quitus Fiscal & Attestation d\'Imposition',
    description: 'Délivrance officielle du quitus fiscal pour appels d\'offres et démarches bancaires.',
    fraisDossier: 15000,
    delaiEstime: '48 heures ouvrables',
    documentsRequis: ['Dernière déclaration fiscale', 'Attestation de paiement des impôts'],
    iconName: 'BuildingIcon'
  },
  {
    id: 'cnss-immat',
    pole: 'Pôle CNSS (Sécurité Sociale)',
    title: 'Immatriculation Employeur & Attestation de Cotisations',
    description: 'Ouverture de compte employeur CNSS et certificat de mise à jour des cotisations sociales.',
    fraisDossier: 20000,
    delaiEstime: '48 heures ouvrables',
    documentsRequis: ['Fiche circuit ANPI / RCCM', 'Liste du personnel et contrats'],
    iconName: 'ShieldIcon'
  },
  {
    id: 'justice-legalisation',
    pole: 'Pôle Justice & Mairie',
    title: 'Légalisation Express & Extrait de Casier Judiciaire',
    description: 'Certification conforme d\'actes en Mairie, légalisation au Tribunal et délivrance du bulletin N°3.',
    fraisDossier: 10000,
    delaiEstime: '24 heures ouvrables',
    documentsRequis: ['Copie originale du document', 'Copie de la CNI du titulaire'],
    iconName: 'ScaleIcon'
  }
];

export default function FacilitationPage() {
  const router = useRouter();

  const [selectedDemarche, setSelectedDemarche] = useState<AdministrativeDemarche>(DEMARCHES_FACILITATION[0]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('Libreville');
  const [details, setDetails] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdTicketCode, setCreatedTicketCode] = useState('');
  const [ussdNoticeSent, setUssdNoticeSent] = useState(false);

  const handleDemarcheSelect = (demarche: AdministrativeDemarche) => {
    setSelectedDemarche(demarche);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      setError('Veuillez remplir vos coordonnées obligatoires (Nom, Email, Téléphone).');
      return;
    }
    setError('');
    setStep(3);
  };

  const handlePaymentAndSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          service: `[FACILITATION] ${selectedDemarche.title}`,
          description: `Société/Organisme: ${companyName || 'N/A'} | Précisions: ${details || 'Aucune'}`,
          city,
          urgency: 'standard',
          payNow: true,
          overridePrice: selectedDemarche.fraisDossier
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Erreur lors de l\'enregistrement du dossier de facilitation.');
        setLoading(false);
        return;
      }

      setCreatedTicketCode(data.ticket.trackingCode);
      setUssdNoticeSent(true);

      // Transition to Step 4 after USSD Push notification
      setTimeout(() => {
        setStep(4);
      }, 2500);

    } catch (err) {
      console.error(err);
      setError('Erreur de connexion. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 space-y-12">
      
      {/* 1. FACILITATION BRANDING HEADER */}
      <section className="relative bg-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <SparklesIcon className="w-4 h-4" />
              <span>Guichet Officiel de Facilitation Gabon</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              O'LO Hub <span className="text-emerald-400 font-black">Facilitation</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Plateforme d'accompagnement express pour vos démarches administratives au Gabon (ANPI, DGI Impôts, CNSS, Légalisation).
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-2xl border border-slate-800 text-xs">
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1. Choix</span>
            <span className="text-slate-600">›</span>
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2. Dossier</span>
            <span className="text-slate-600">›</span>
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3. Règlement</span>
            <span className="text-slate-600">›</span>
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>4. Ticket</span>
          </div>
        </div>
      </section>

      {/* MAIN WIZARD CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* STEP 1: CATALOGUE DE FACILITATION */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sélectionnez la Démarche Administrative</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Consultez les 4 pôles majeurs de facilitation et réglez les frais de dossier obligatoires pour lancer votre procédure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEMARCHES_FACILITATION.map((demarche) => (
                <div
                  key={demarche.id}
                  className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                        {demarche.pole}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">Délai : {demarche.delaiEstime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">{demarche.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{demarche.description}</p>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pièces à fournir :</span>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        {demarche.documentsRequis.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Frais de Dossier</span>
                      <span className="text-xl font-extrabold text-emerald-400 font-mono">
                        {demarche.fraisDossier.toLocaleString()} FCFA
                      </span>
                    </div>

                    <button
                      onClick={() => handleDemarcheSelect(demarche)}
                      className="px-5 py-3 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-all flex items-center gap-2 shadow-md transform hover:scale-105"
                    >
                      <span>Initer cette Démarche</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: FORMULAIRE DE SAISIE */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Démarche Sélectionnée</span>
                <h2 className="text-xl font-extrabold text-white">{selectedDemarche.title}</h2>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700"
              >
                Changer de démarche
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleStep2Submit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Nom & Prénom du Déclarant *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Jean-Marc Nguema"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Téléphone Mobile Money (Gabon) *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="077519644 ou 066000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Adresse E-mail *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="jean.nguema@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Ville de Traitement *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Libreville">Libreville</option>
                    <option value="Port-Gentil">Port-Gentil</option>
                    <option value="Franceville">Franceville</option>
                    <option value="Oyem">Oyem</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Dénomination de la Société / Organisme (Si applicable)</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ex: Gabon Tech Services SARL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Précisions Additionnelles sur le Dossier</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Information particulière pour les agents de facilitation..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl font-bold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-md"
                >
                  <span>Procéder au Règlement</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: PAIEMENT OBLIGATOIRE MOBILE MONEY (USSD PUSH) */}
        {step === 3 && (
          <div className="max-w-xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <PhoneIcon className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">USSD Push Mobile Money</span>
              <h2 className="text-2xl font-extrabold text-white">{selectedDemarche.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Une notification USSD Push va être transmise directement sur votre téléphone (<span className="text-emerald-400 font-bold">{clientPhone}</span>) pour valider le règlement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Déclarant :</span>
                <span className="font-semibold text-white">{clientName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Téléphone :</span>
                <span className="font-mono text-emerald-400 font-bold">{clientPhone}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-white">Frais de Dossier à Valider :</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                  {selectedDemarche.fraisDossier.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {ussdNoticeSent && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium space-y-1">
                <p className="font-bold text-emerald-400">Demande USSD Push transmise avec succès !</p>
                <p className="text-[11px] text-slate-300">Saisissez le code PIN sur votre téléphone Airtel Money / Moov Money.</p>
              </div>
            )}

            {error && (
              <p className="text-xs text-rose-300 font-semibold">{error}</p>
            )}

            <div className="pt-2 space-y-3">
              <button
                onClick={handlePaymentAndSubmit}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span>Envoi du USSD Push en cours...</span>
                ) : (
                  <>
                    <CreditCardIcon className="w-5 h-5" />
                    <span>Valider & Envoyer le USSD Push ({selectedDemarche.fraisDossier.toLocaleString()} FCFA)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Modifier mes informations
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TICKET CONFIRMÉ */}
        {step === 4 && (
          <div className="max-w-xl mx-auto glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-6">
            <CheckCircleIcon className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Dossier Enregistré & Transmis</span>
              <h2 className="text-2xl font-extrabold text-white">Ticket N° {createdTicketCode}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Votre paiement Mobile Money a été initié et votre dossier de facilitation administrative a été réorienté vers nos agents.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/suivi/${createdTicketCode}`}
                className="px-6 py-3 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-colors"
              >
                Consulter mon Suivi en Direct
              </Link>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-2xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
              >
                Nouvelle Démarche
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
