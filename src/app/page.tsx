'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldIcon,
  BuildingIcon,
  BriefcaseIcon,
  ScaleIcon,
  WheatIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CreditCardIcon
} from '@/components/Icons';

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* 1. HERO SECTION (DIGITAL ARC STYLE) */}
      <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-grid-lines overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          {/* Monospace Section Tag */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase font-semibold tracking-widest text-emerald-400">
              O'LO Hub — Ogooué Labs Gabon
            </span>
          </div>

          {/* High-Impact Upper-Case Headline (Digital Arc Style) */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold uppercase tracking-tighter max-w-4xl leading-none text-white">
              Le Portail des Solutions Numériques <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">au Gabon</span>.
            </h1>

            {/* Digital Arc Pill Action Button + Rotating Arrow */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/hubs"
                className="group flex items-center gap-3 pl-8 pr-2 py-4 rounded-full text-sm font-mono font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-xl"
              >
                <span>Découvrir les Hubs</span>
                <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:rotate-[312deg] transition-transform duration-300">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400 font-mono max-w-3xl leading-relaxed">
            Plateforme technologique de référence initiée sous la vision du Coach Sylvère Boussamba et d'Ogooué Labs pour unifier les services d'innovation et la facilitation au Gabon.
          </p>

          {/* Video / Workspace Interactive Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-80 sm:h-[420px]">
            <Image
              src="/images/gabonese_youth_tech.jpg"
              alt="Espace Innovation O'LO Hub Gabon"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/40"></div>
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 max-w-lg space-y-1">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">Vision & Innovation</span>
                <p className="text-xs text-slate-200">
                  Accompagnement de la jeunesse gabonaise et accélération du développement numérique national.
                </p>
              </div>

              <Link
                href="/facilitation"
                className="hidden sm:flex group items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg"
              >
                <ShieldIcon className="w-4 h-4" />
                <span>Hub Facilitation</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INFINITE MARQUEE PARTNERS TICKER (DIGITAL ARC STYLE) */}
      <section className="py-6 border-b border-slate-800 bg-slate-950 overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-12 text-slate-400 font-mono text-xs uppercase tracking-widest font-bold">
          <span className="flex items-center gap-3"><span className="text-emerald-400">●</span> ANPI Gabon</span>
          <span className="flex items-center gap-3"><span className="text-amber-400">●</span> DGI Impôts</span>
          <span className="flex items-center gap-3"><span className="text-teal-400">●</span> CNSS Sécurité Sociale</span>
          <span className="flex items-center gap-3"><span className="text-emerald-400">●</span> Airtel Money</span>
          <span className="flex items-center gap-3"><span className="text-amber-400">●</span> Moov Money</span>
          <span className="flex items-center gap-3"><span className="text-teal-400">●</span> Ogooué Labs</span>
          
          {/* Repeated for continuous infinite loop */}
          <span className="flex items-center gap-3"><span className="text-emerald-400">●</span> ANPI Gabon</span>
          <span className="flex items-center gap-3"><span className="text-amber-400">●</span> DGI Impôts</span>
          <span className="flex items-center gap-3"><span className="text-teal-400">●</span> CNSS Sécurité Sociale</span>
          <span className="flex items-center gap-3"><span className="text-emerald-400">●</span> Airtel Money</span>
          <span className="flex items-center gap-3"><span className="text-amber-400">●</span> Moov Money</span>
          <span className="flex items-center gap-3"><span className="text-teal-400">●</span> Ogooué Labs</span>
        </div>
      </section>

      {/* 3. SHOWCASE DES HUBS (DIGITAL ARC NUMBERED ROWS STYLE) */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white"></span>
              <span className="text-xs font-mono uppercase font-medium tracking-widest text-slate-400">Catalogue</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold uppercase tracking-tighter text-white">
              Les Hubs de l'Écosystème
            </h2>
          </div>
          <Link href="/hubs" className="text-xs font-mono uppercase tracking-wider text-emerald-400 hover:underline">
            Voir tous les hubs →
          </Link>
        </div>

        {/* Numbered Row 1: Hub de Facilitation (Actif) */}
        <div className="group border border-slate-800 rounded-3xl p-6 sm:p-8 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            
            <div className="flex items-start gap-6">
              <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                (01)
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-white">
                    Hub O'LO Facilitation Administrative
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    Actif
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 max-w-2xl leading-relaxed">
                  Guichet autonome pour vos démarches ANPI (Création d'entreprise), DGI Impôts (Quitus fiscal), CNSS et actes de Justice/Mairie. Règlement fixe par Mobile Money.
                </p>
              </div>
            </div>

            <Link
              href="/facilitation"
              className="group/btn flex items-center gap-3 pl-6 pr-2 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shrink-0"
            >
              <span>Lancer un Dossier</span>
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover/btn:rotate-[312deg] transition-transform duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </Link>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold block">Pôle ANPI</span>
              <span className="text-slate-500 text-[11px]">25 000 FCFA</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-amber-400 font-bold block">Pôle DGI</span>
              <span className="text-slate-500 text-[11px]">15 000 FCFA</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-teal-400 font-bold block">Pôle CNSS</span>
              <span className="text-slate-500 text-[11px]">20 000 FCFA</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold block">Pôle Justice</span>
              <span className="text-slate-500 text-[11px]">10 000 FCFA</span>
            </div>
          </div>
        </div>

        {/* Numbered Row 2: Future Hubs Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="border border-slate-800 rounded-3xl p-6 bg-slate-900/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 font-bold">(02)</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Prochainement
              </span>
            </div>
            <h4 className="text-lg font-semibold uppercase tracking-tight text-white">Hub O'LO Entreprises & IT</h4>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Pôle d'accompagnement numérique et conseil en transformation digitale pour les PME.
            </p>
          </div>

          <div className="border border-slate-800 rounded-3xl p-6 bg-slate-900/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 font-bold">(03)</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Prochainement
              </span>
            </div>
            <h4 className="text-lg font-semibold uppercase tracking-tight text-white">Hub O'LO Travail & Emploi</h4>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Insertion professionnelle des jeunes talents du Gabon et gestion de compétences.
            </p>
          </div>

          <div className="border border-slate-800 rounded-3xl p-6 bg-slate-900/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 font-bold">(04)</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Prochainement
              </span>
            </div>
            <h4 className="text-lg font-semibold uppercase tracking-tight text-white">Hub O'LO Agro & Environnement</h4>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Accélération des filières agricoles et de la conformité environnementale au Gabon.
            </p>
          </div>

        </div>

      </section>

      {/* 4. METRICS & EXPERIENCE GRID (DIGITAL ARC STYLE) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="border border-slate-800 p-8 rounded-3xl bg-slate-900/40 space-y-2">
            <span className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-emerald-400">100%</span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Sécurisé par Mobile Money</p>
          </div>

          <div className="border border-slate-800 p-8 rounded-3xl bg-slate-900/40 space-y-2">
            <span className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-amber-400">24h - 48h</span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Délais Moyen de Prise en Charge</p>
          </div>

          <div className="border border-slate-800 p-8 rounded-3xl bg-slate-900/40 space-y-2">
            <span className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-teal-400">0 Papier</span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Processus Digitalisé Intégralement</p>
          </div>

        </div>
      </section>

    </div>
  );
}
