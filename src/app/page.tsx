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
  CreditCardIcon,
  ClockIcon,
  TicketIcon
} from '@/components/Icons';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20 bg-slate-900 text-slate-100">
      
      {/* 1. HERO SECTION : PORTAIL NUMÉRIQUE OGOOUÉ LABS */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:py-24 border-b border-slate-800">
        
        {/* Background Image with Ken-Burns Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-25">
          <Image
            src="/images/olo_hub_workspace.jpg"
            alt="Espace O'LO Hub Ogooué Labs Gabon"
            fill
            className="object-cover object-center animate-kenburns"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
        </div>

        {/* Accent Lines & Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600"></div>
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Headline & Primary Actions */}
            <div className="lg:col-span-7 space-y-8 hero-animate-in">
              
              {/* Ogooué Labs Badge */}
              <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-400 shadow-md">
                <SparklesIcon className="w-4 h-4 text-amber-400 animate-spin" />
                <span>O'LO Hub — Le Hub Numérique d'Ogooué Labs</span>
              </div>

              {/* High-Impact Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Le Portail des Solutions Numériques & Innovantes <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">au Gabon</span>.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Sous la vision du Coach Sylvère Boussamba et d'Ogooué Labs, O'LO Hub réunit les solutions technologiques d'avenir pour propulser les créateurs et les talents gabonais.
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/hubs"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl transition-all flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <SparklesIcon className="w-4 h-4 text-amber-400" />
                  <span>Découvrir le Catalogue des Hubs</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/facilitation"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl text-xs font-extrabold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldIcon className="w-4 h-4 text-emerald-400" />
                  <span>Accéder au Hub de Facilitation</span>
                </Link>
              </div>

              {/* Trust Features */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  <span>Inclusion Numérique & Mobile Money</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  <span>Accompagnement Ogooué Labs</span>
                </div>
              </div>

            </div>

            {/* Right Col: Showcase Image Card */}
            <div className="lg:col-span-5">
              <div className="glass-card p-4 rounded-3xl border border-slate-800 space-y-4 shadow-2xl relative overflow-hidden">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-slate-800">
                  <Image
                    src="/images/gabonese_youth_tech.jpg"
                    alt="Jeunes Talents et Innovateurs Gabonais"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800">
                    Jeunes Innovateurs & Développeurs Gabonais
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-white block text-sm">Vision Coach Sylvère Boussamba</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    "Accélérer le développement du Gabon par la technologie et offrir un accès simplifié aux solutions de demain."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LE HUB OPERATIONNEL EN VEDETTE : HUB DE FACILITATION ADMINISTRATIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 inline-block">
            Hub Opérationnel Actif
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Le Hub de Facilitation Administrative
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Notre premier service en ligne permettant d'effectuer vos formalités ANPI, DGI, CNSS, et légalisations administratives avec règlement Mobile Money.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border-2 border-emerald-500/40 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl">
                  GA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Guichet Unique de Facilitation Gabon</h3>
                  <span className="text-xs text-slate-400">Règlement fixe par Airtel Money & Moov Money</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="font-bold text-emerald-400 block">ANPI</span>
                  <span className="text-[10px] text-slate-400">Création SARL</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="font-bold text-amber-400 block">DGI</span>
                  <span className="text-[10px] text-slate-400">Immatriculation NIF</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="font-bold text-teal-400 block">CNSS</span>
                  <span className="text-[10px] text-slate-400">Sécurité Sociale</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="font-bold text-emerald-400 block">Justice</span>
                  <span className="text-[10px] text-slate-400">Casier & Actes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center space-y-4">
              <Link
                href="/facilitation"
                className="w-full py-4 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShieldIcon className="w-4 h-4" />
                <span>Lancer une Démarche Facilitation</span>
              </Link>
              <span className="text-[11px] text-slate-500 block">
                Prise en charge sous 24h à 48h ouvrées
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* 3. SECTION VISION & ÉCOSYSTÈME OGOOUÉ LABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative h-72 rounded-2xl overflow-hidden border border-slate-800">
              <Image
                src="/images/gabonese_hubs_showcase.jpg"
                alt="Espace Innovation Ogooué Labs"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-block">
                Inspiré par le Coach Sylvère Boussamba
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Bâtir l'Écosystème Numérique du Gabon
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ogooué Labs œuvre pour faire émerger une génération d'entrepreneurs et de développeurs capables d'impacter durablement l'économie nationale grâce aux technologies numériques.
              </p>

              <div className="pt-2">
                <Link
                  href="/vision"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>En savoir plus sur la Vision</span>
                  <ArrowRightIcon className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
