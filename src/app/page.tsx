'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldIcon,
  CreditCardIcon,
  TicketIcon,
  SearchIcon,
  MessageSquareIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BuildingIcon,
  BriefcaseIcon,
  ScaleIcon,
  WheatIcon,
  UsersIcon,
  BarChartIcon
} from '@/components/Icons';
import { OLO_HUBS } from '@/lib/hubs';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "OGOOOUÉ LABS • ÉCOSYSTÈME DYNAMIQUE",
      title: "Un Foyer de Productivité et d'Innovation au Gabon",
      desc: "O'lo Hub offre un terreau fertile où la productivité prospère, où les entrepreneurs, créatifs et innovateurs se croisent pour donner naissance à des projets d'avenir.",
      cta: "Explorer les Hubs",
      href: "/#hubs"
    },
    {
      badge: "PAIEMENT EN LIGNE OBLIGATOIRE",
      title: "Règlement des Frais de Dossier via Agrégateur",
      desc: "Réglez vos frais de dossier fixes par Airtel Money ou Moov Money avant de soumettre vos demandes et de générer votre ticket.",
      cta: "Créer une Demande",
      href: "/nouveau-ticket"
    },
    {
      badge: "SUIVI EN TEMPS RÉEL & BACKOFFICE",
      title: "Traçabilité et Support Client Connecté",
      desc: "Chaque dossier fait l'objet d'un suivi transparent avec prise en charge directe par nos équipes via le système de ticketing.",
      cta: "Accéder au Suivi",
      href: "/suivi"
    }
  ];

  // Auto-carousel transition like Anime-Sama Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="space-y-16 pb-20 bg-slate-900 text-slate-100">
      
      {/* 1. HERO CAROUSEL SECTION WITH ANIME-SAMA INSPIRED ANIMATIONS */}
      <section className="relative h-[540px] lg:h-[78vh] overflow-hidden bg-slate-950 text-white border-b border-slate-800 group">
        
        {/* Background Image with Anime-Sama Ken Burns Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/olo_hub_workspace.jpg"
            alt="Espace O'lo Hub Gabon"
            fill
            className="object-cover object-center opacity-30 animate-kenburns"
            priority
          />
          {/* Multi-layered Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none hero-glow-accent"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Hero Content with Keyed Entrance Animation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex h-full flex-col justify-center">
          <div key={currentSlide} className="max-w-3xl space-y-6 hero-animate-in">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-600/90 backdrop-blur-md text-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.15em] rounded-full shadow-lg border border-emerald-400/30">
              <SparklesIcon className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
              <span>{slides[currentSlide].badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl tracking-tight text-white drop-shadow-md">
              {slides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              {slides[currentSlide].desc}
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href={slides[currentSlide].href}
                className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase rounded-full shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-105"
              >
                <span>{slides[currentSlide].cta}</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/suivi"
                className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 hover:border-emerald-500 text-slate-100 px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase rounded-full transition-all shadow-sm"
              >
                <SearchIcon className="w-4 h-4 text-emerald-400" />
                <span>Suivre mon Dossier</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Carousel Slider Controls (Bottom Right - Anime-Sama Style) */}
        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all duration-500 rounded-full ${
                  currentSlide === idx
                    ? 'w-12 bg-emerald-400 shadow-lg shadow-emerald-500/50'
                    : 'w-4 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="flex h-10 w-10 items-center justify-center border border-slate-700 bg-slate-900/80 backdrop-blur-md text-white rounded-full hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-md active:scale-95"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
              className="flex h-10 w-10 items-center justify-center border border-slate-700 bg-slate-900/80 backdrop-blur-md text-white rounded-full hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-md active:scale-95"
            >
              ›
            </button>
          </div>
        </div>

        {/* Bottom Glowing Accent Progress Line (Anime-Sama signature style) */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-800 z-20">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 hero-glow-accent"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      </section>

      {/* 2. MOT DU COACH SYLVÈRE BOUSSAMBA (Ogooué Labs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-12 border border-slate-800 relative overflow-hidden bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Image of Gabonese Innovators & Leadership */}
            <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <Image
                src="/images/gabonese_innovators.jpg"
                alt="Coach Sylvère Boussamba & Innovation Gabon"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                <span className="text-xs font-bold text-emerald-400 block">Coach Sylvère Boussamba</span>
                <span className="text-[11px] text-slate-300">Fondateur Ogooué Labs & Visionnaire O'lo Hub</span>
              </div>
            </div>

            {/* Right Quote & Philosophy text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <SparklesIcon className="w-4 h-4" />
                <span>Vision & Philosophie Ogooué Labs</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                "O'lo Hub incarne bien plus qu'un simple hub. C'est un écosystème dynamique où les idées prennent vie."
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-emerald-500 pl-4">
                <p>
                  "Chez Ogooué Labs nous croyons fermement en l'impact transformateur de la synergie et de l'échange d'idées. O'lo Hub offre un terreau fertile où la productivité prospère, où les entrepreneurs, les créatifs et les innovateurs se croisent pour donner naissance à des projets qui repoussent les limites de l'imagination."
                </p>
                <p>
                  "La productivité dans tous les domaines est cruciale pour le progrès de notre société. Ensemble, nous pouvons créer un environnement propice à l'éclosion de solutions révolutionnaires. <strong className="text-emerald-400 not-italic">We can !</strong>"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">— Coach Sylvère Boussamba</span>
                <Link
                  href="/nouveau-ticket"
                  className="px-5 py-2.5 rounded-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-colors flex items-center gap-2"
                >
                  <span>Rejoindre la Dynamique</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DYNAMIC HUBS PLATFORMS SELECTION (NO EMOJIS, STRICT SVG PICTOGRAMS) */}
      <section id="hubs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3 py-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 uppercase tracking-widest">
            Plateformes & Hubs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Sélectionnez Votre Hub O'LO</h2>
          <p className="text-slate-400 text-sm">
            Chaque Hub intègre son catalogue de services avec un paiement obligatoire des frais de dossier fixes avant accès.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OLO_HUBS.map((hub) => (
            <div key={hub.id} className="glass-card glass-card-hover rounded-3xl p-6 space-y-4 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {hub.iconName === 'BriefcaseIcon' && <BriefcaseIcon className="w-7 h-7 text-emerald-400" />}
                  {hub.iconName === 'ScaleIcon' && <ScaleIcon className="w-7 h-7 text-emerald-400" />}
                  {hub.iconName === 'WheatIcon' && <WheatIcon className="w-7 h-7 text-emerald-400" />}
                  {hub.iconName !== 'BriefcaseIcon' && hub.iconName !== 'ScaleIcon' && hub.iconName !== 'WheatIcon' && <BuildingIcon className="w-7 h-7 text-emerald-400" />}
                </div>
                <h3 className="text-lg font-bold text-white">{hub.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{hub.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Frais de dossier fixes:</span>
                  <span className="font-mono font-bold text-emerald-400">{hub.fraisDeDossierFixe.toLocaleString()} FCFA</span>
                </div>

                <Link
                  href={`/nouveau-ticket?hub=${hub.slug}`}
                  className="w-full py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-emerald-600 text-white text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Accéder au Hub</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MANDATORY PAYMENT & PROCESS STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-12 border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Parcours Utilisateur Simplifié</h3>
            <p className="text-xs sm:text-sm text-slate-400">De la sélection du hub à la prise en charge par nos équipes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">1</div>
                <h4 className="text-sm font-bold text-white">Sélection du Hub & Service</h4>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Consultez le catalogue de services de la plateforme et choisissez l'option correspondant à votre projet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">2</div>
                <h4 className="text-sm font-bold text-white">Paiement Obligatoire</h4>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Réglez les frais de dossier fixes via l'agrégateur Mobile Money (Airtel / Moov Money) pour débloquer le formulaire.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">3</div>
                <h4 className="text-sm font-bold text-white">Ticket & Suivi par nos Équipes</h4>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Le ticket est généré via API. Nos agents prennent en charge la gestion du dossier et le contact avec vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BACKOFFICE LINK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <BarChartIcon className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Espace Backoffice Administrateur</h4>
              <p className="text-xs text-slate-400">Suivi des plateformes, frais de dossier encaissés et revenus générés.</p>
            </div>
          </div>

          <Link
            href="/admin"
            className="px-6 py-3 rounded-full font-bold bg-slate-800 hover:bg-slate-700 text-white text-xs transition-colors shrink-0"
          >
            Accéder au Backoffice
          </Link>
        </div>
      </section>

    </div>
  );
}
