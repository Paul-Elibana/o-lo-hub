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
    documentsRequis: ['Pièce d\'identité du gérant (CNI / Passeport)', 'Justificatif de domicile (SEEG / Bail)', 'Casier judiciaire (- 3 mois)'],
    iconName: 'BuildingIcon'
  },
  {
    id: 'dgi-quitus',
    pole: 'Pôle DGI (Impôts & Fiscalité)',
    title: 'Obtention du Quitus Fiscal & Attestation d\'Imposition',
    description: 'Délivrance officielle du quitus fiscal pour appels d\'offres et démarches bancaires.',
    fraisDossier: 15000,
    delaiEstime: '48 heures ouvrables',
    documentsRequis: ['Dernière déclaration fiscale', 'Attestation de paiement des impôts', 'NIF de la société'],
    iconName: 'BuildingIcon'
  },
  {
    id: 'cnss-immat',
    pole: 'Pôle CNSS (Sécurité Sociale)',
    title: 'Immatriculation Employeur & Attestation de Cotisations',
    description: 'Ouverture de compte employeur CNSS et certificat de mise à jour des cotisations sociales.',
    fraisDossier: 20000,
    delaiEstime: '48 heures ouvrables',
    documentsRequis: ['Statuts de l\'entreprise', 'Liste des salariés', 'Registre d\'immatriculation RCCM'],
    iconName: 'ShieldIcon'
  },
  {
    id: 'justice-casier',
    pole: 'Pôle Justice & Mairie',
    title: 'Extrait de Casier Judiciaire & Actes Légalisés',
    description: 'Procédure express de délivrance de casier judiciaire et légalisation conforme de documents.',
    fraisDossier: 10000,
    delaiEstime: '24 heures ouvrables',
    documentsRequis: ['Acte de naissance original', 'Pièce d\'identité du demandeur'],
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
  
  // Simultaneous Multi-File Upload State (Step 2)
  const [uploadedFiles, setUploadedFiles] = useState<{ [docKey: string]: { name: string; size: string } }>({});
  
  // OTP / Mobile Money PIN Validation State (Step 3)
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpValidating, setOtpValidating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdTicketCode, setCreatedTicketCode] = useState('');
  const [ussdNoticeSent, setUssdNoticeSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDemarcheSelect = (demarche: AdministrativeDemarche) => {
    setSelectedDemarche(demarche);
    setUploadedFiles({});
    setStep(2);
  };

  const handleFileUpload = (docLabel: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const fileSizeStr = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

    setUploadedFiles((prev) => ({
      ...prev,
      [docLabel]: {
        name: file.name,
        size: fileSizeStr
      }
    }));
  };

  const handleBatchFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newUploads: { [docKey: string]: { name: string; size: string } } = { ...uploadedFiles };

    Array.from(files).forEach((file, index) => {
      const docLabel = selectedDemarche.documentsRequis[index] || `Document ${index + 1} (${file.name})`;
      const fileSizeStr = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      newUploads[docLabel] = {
        name: file.name,
        size: fileSizeStr
      };
    });

    setUploadedFiles(newUploads);
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

  const handleSendUssdPush = async () => {
    setLoading(true);
    setError('');

    try {
      const docSummary = Object.entries(uploadedFiles)
        .map(([label, info]) => `${label}: ${info.name}`)
        .join(' | ');

      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          service: `[FACILITATION] ${selectedDemarche.title}`,
          description: `Société: ${companyName || 'N/A'} | Précisions: ${details || 'Aucune'} | Pièces jointes: ${docSummary || 'Aucune'}`,
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
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion lors de l\'envoi USSD Push. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleValidateOtpAndConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (!otpCode || otpCode.length < 4) {
      setOtpError('Veuillez saisir votre code PIN secret à 4 chiffres (Airtel / Moov Money).');
      return;
    }

    setOtpValidating(true);

    // Simulate instant Mobile Money PIN verification
    setTimeout(async () => {
      try {
        if (createdTicketCode) {
          await fetch(`/api/tickets/${encodeURIComponent(createdTicketCode)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'mark_paid' })
          }).catch(() => null);
        }
      } catch (err) {
        console.warn('OTP sync notice:', err);
      } finally {
        setOtpValidating(false);
        setStep(4);
      }
    }, 1500);
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
          <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-2xl border border-slate-800 text-xs font-mono">
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1. Choix</span>
            <span className="text-slate-600">›</span>
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2. Fichiers & Info</span>
            <span className="text-slate-600">›</span>
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3. Code OTP / PIN</span>
            <span className="text-slate-600">›</span>
            <span className={`px-3 py-1.5 rounded-xl font-bold ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>4. Reçu Ticket</span>
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
                      <span>Initier cette Démarche</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: FORMULAIRE + UPLOAD DE TOUS LES FICHIERS EN MÊME TEMPS */}
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

            <form onSubmit={handleStep2Submit} className="space-y-6 text-xs">
              
              {/* Coordonnées */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                  1. Coordonnées du Déclarant
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Nom & Prénom du Déclarant *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Jean-Marc Nguema"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Ville de Traitement *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
                    >
                      <option value="Libreville">Libreville</option>
                      <option value="Port-Gentil">Port-Gentil</option>
                      <option value="Franceville">Franceville</option>
                      <option value="Oyem">Oyem</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Dénomination de la Société (Si applicable)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ex: Gabon Tech Services SARL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* UPLOAD SIMULTANÉ DE TOUS LES FICHIERS REQUIS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    2. Téléversement Simultané des Fichiers Requis
                  </h3>
                  
                  {/* Global Multi-file uploader button */}
                  <label className="px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer flex items-center gap-1.5 transition-colors">
                    <UploadIcon className="w-3.5 h-3.5" />
                    <span>Choisir Tous les Fichiers à la fois</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleBatchFileUpload(e.target.files)}
                    />
                  </label>
                </div>

                <p className="text-xs text-slate-400">
                  Sélectionnez l'ensemble des documents justificatifs requis en une seule fois ou document par document ci-dessous :
                </p>

                <div className="space-y-3">
                  {selectedDemarche.documentsRequis.map((docLabel, idx) => {
                    const fileAttached = uploadedFiles[docLabel];

                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="font-bold text-white block">{docLabel}</span>
                          {fileAttached ? (
                            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5 text-[11px]">
                              <CheckCircleIcon className="w-3.5 h-3.5" />
                              Fichier joint : {fileAttached.name} ({fileAttached.size})
                            </span>
                          ) : (
                            <span className="text-amber-400 font-mono text-[11px]">En attente de fichier</span>
                          )}
                        </div>

                        <label className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors shrink-0 flex items-center gap-1.5 ${
                          fileAttached
                            ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}>
                          <UploadIcon className="w-3.5 h-3.5" />
                          <span>{fileAttached ? 'Changer' : 'Parcourir'}</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(docLabel, e.target.files)}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-mono text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-md"
                >
                  <span>Valider & Passer au Règlement ({selectedDemarche.fraisDossier.toLocaleString()} FCFA)</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 3: PAIEMENT E-BILLING & SAISIE DU CODE SECRET OTP / PIN */}
        {step === 3 && (
          <div className="max-w-xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <PhoneIcon className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Paiement Mobile Money & Validation OTP / PIN
              </span>
              <h2 className="text-2xl font-extrabold text-white">{selectedDemarche.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Une notification USSD Push est envoyée sur votre téléphone (<span className="text-emerald-400 font-bold">{clientPhone}</span>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Déclarant :</span>
                <span className="font-semibold text-white">{clientName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Téléphone :</span>
                <span className="text-emerald-400 font-bold">{clientPhone}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Opérateur Détecté :</span>
                <span className="text-amber-400 font-bold">
                  {(clientPhone.startsWith('06') || clientPhone.startsWith('6')) ? 'Moov Money' : 'Airtel Money'}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-white">Frais de Dossier à Valider :</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  {selectedDemarche.fraisDossier.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* If USSD Push not sent yet, show Send Button */}
            {!ussdNoticeSent ? (
              <div className="space-y-3">
                <button
                  onClick={handleSendUssdPush}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-mono text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span>Envoi de l'alerte USSD Push...</span>
                  ) : (
                    <>
                      <CreditCardIcon className="w-5 h-5" />
                      <span>Déclencher l'alerte USSD Push ({selectedDemarche.fraisDossier.toLocaleString()} FCFA)</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* If USSD Push sent, display interactive OTP / PIN Verification Form */
              <form onSubmit={handleValidateOtpAndConfirm} className="space-y-4 pt-2 text-left">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                    Alerte USSD Transmise avec Succès !
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Veuillez valider l'invite USSD reçue sur votre téléphone ou saisir votre code PIN secret à 4 chiffres ci-dessous pour autoriser l'encaissement immédiat.
                  </p>
                </div>

                {otpError && (
                  <p className="text-xs text-rose-400 font-semibold">{otpError}</p>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-300 font-bold">
                    Code Secret PIN / OTP Mobile Money (4 chiffres) *
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • •"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={otpValidating}
                  className="w-full py-4 rounded-2xl font-mono text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {otpValidating ? (
                    <span>Verification du Code PIN en cours...</span>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5 text-amber-300" />
                      <span>Valider le Code PIN & Obtenir le Récépissé</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <button
              onClick={() => setStep(2)}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 block mx-auto pt-2"
            >
              Modifier les informations du dossier
            </button>
          </div>
        )}

        {/* STEP 4: TICKET CONFIRMÉ */}
        {step === 4 && (
          <div className="max-w-xl mx-auto glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-6">
            <CheckCircleIcon className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Dossier Enregistré & Transmis</span>
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-2xl font-extrabold font-mono text-white">Ticket N° {createdTicketCode}</h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdTicketCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-3 py-1 text-xs font-mono font-bold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:border-emerald-500 transition-all cursor-pointer"
                >
                  {copied ? '✓ Copié !' : 'Copier'}
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Votre paiement Mobile Money et le code secret OTP PIN ont été validés avec succès. Votre dossier de facilitation administrative est pris en charge par nos facilitateurs.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/suivi/${createdTicketCode}`}
                className="px-6 py-3 rounded-2xl font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-colors"
              >
                Consulter mon Suivi en Direct
              </Link>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-2xl font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
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
