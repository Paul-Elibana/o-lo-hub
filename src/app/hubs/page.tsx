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
  ClockIcon,
  CreditCardIcon
} from '@/components/Icons';

export default function HubsPage() {
  return (
    <div className="space-y-20 pb-20 bg-slate-900 text-slate-100">
      
      {/* 1. HERO BANNER CATALOGUE DES HUBS */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            <SparklesIcon className="w-4 h-4 text-amber-400" />
            <span>Catalogue des Hubs d'Ogooué Labs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Les Solutions Numériques & Hubs de l'Écosystème <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">O'LO Hub Gabon</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos plateformes dédiées au développement économique, à la simplification administrative et à l'accompagnement des jeunes innovateurs gabonais.
          </p>
        </div>
      </section>

      {/* 2. LE HUB ACTIF : HUB DE FACILITATION ADMINISTRATIVE (EN VEDETTE DESSINÉE AVEC PLUSIEURS IMAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-emerald-500/50 space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-2xl bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider">
            Hub Opérationnel Actif
          </div>

          {/* Hub Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Hub O'LO Facilitation Administrative
                  </h2>
                  <span className="text-xs font-semibold text-emerald-400">
                    Guichet Unique ANPI, DGI, CNSS, Justice & Mairie
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Le seul guichet de facilitation autonome permettant aux entrepreneurs, PME et citoyens au Gabon d'effectuer leurs démarches administratives officielles en ligne et de régler leurs frais fixes par Mobile Money.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">Création d'Entreprise (ANPI)</span>
                  <span className="text-slate-400">RCCM, NIF & Annonce légale</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">Sécurité Sociale (CNSS)</span>
                  <span className="text-slate-400">Immatriculation & quitus</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/facilitation"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl transition-all flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <ShieldIcon className="w-4 h-4" />
                  <span>Accéder au Hub de Facilitation</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <CreditCardIcon className="w-4 h-4 text-amber-400" />
                  Paiement Airtel & Moov Money
                </span>
              </div>
            </div>

            {/* Images Showcase Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <Image
                  src="/images/gabonese_hubs_showcase.jpg"
                  alt="Espace Hub Gabon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <Image
                  src="/images/gabonese_youth_tech.jpg"
                  alt="Jeunes Innovateurs Gabonais"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 relative h-48 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <Image
                  src="/images/olo_hub_workspace.jpg"
                  alt="Espace de Travail O'LO Hub"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
                  Libreville, Gabon
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LES FUTURS HUBS NUMÉRIQUES D'OGOOUÉ LABS (PROCHAINEMENT DISPONIBLES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Développement & Prochains Hubs
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Les Prochains Pôles de l'Écosystème Ogooué Labs
          </h2>
          <p className="text-xs text-slate-400">
            Ces hubs spécialisés sont en cours de développement sous la conduite d'Ogooué Labs et ouvriront prochainement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hub 1: Entreprises & IT */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 relative opacity-90">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                <BuildingIcon className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Prochainement
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Hub O'lo Entreprises & IT</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pôle d'accompagnement numérique, conseil en transformation digitale et audit d'architecture logicielle pour les PME du Gabon.
            </p>
          </div>

          {/* Hub 2: Travail & Emploi */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 relative opacity-90">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                <BriefcaseIcon className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Prochainement
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Hub O'lo Travail & Emploi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plateforme d'insertion professionnelle des jeunes talents du Gabon, gestion de contrats et bilans de compétences.
            </p>
          </div>

          {/* Hub 3: Agro-Alimentaire & Environnement */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 relative opacity-90">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                <WheatIcon className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Prochainement
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Hub O'lo Agro & Environnement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Valorisation des projets agritech, mise en conformité environnementale et accélération des filières agricoles gabonaises.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
