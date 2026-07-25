'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SparklesIcon,
  ShieldIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@/components/Icons';

export default function VisionPage() {
  return (
    <div className="space-y-20 pb-20 bg-slate-900 text-slate-100">
      
      {/* HERO BANNER VISION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest text-amber-400">
            <SparklesIcon className="w-4 h-4 text-emerald-400" />
            <span>La Vision d'Ogooué Labs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Propulser la Jeunesse et l'Innovation Numérique <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">au Gabon</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez la philosophie d'Ogooué Labs portée par le Coach Sylvère Boussamba : transformer les défis administratifs et technologiques en opportunités d'avenir pour nos créateurs.
          </p>
        </div>
      </section>

      {/* DETAILED VISION CONTENT WITH GABONESE YOUTH IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Image: Gabonese Innovators & Coach Sylvère Boussamba */}
            <div className="lg:col-span-6 relative h-80 lg:h-[420px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image
                src="/images/gabonese_innovators.jpg"
                alt="Coach Sylvère Boussamba et les Innovateurs Gabonais"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-white block text-sm">Coach Sylvère Boussamba</span>
                <span className="text-slate-400 block">Fondateur d'Ogooué Labs & Initiateur d'O'LO Hub</span>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 inline-block">
                L'Engagement Écosystème
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                "Offrir à chaque jeune Gabonais les outils de sa réussite"
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Chez Ogooué Labs, nous croyons fermement que le Gabon dispose d'un vivier exceptionnel de talents informatiques et d'entrepreneurs créatifs. O'LO Hub est conçu pour supprimer les verrous et créer des passerelles entre l'innovation et les services essentiels.
              </p>

              <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1">
                « Notre objectif est de faire d'O'LO Hub la plateforme de référence où chaque projet numérique gabonais trouve un accompagnement de classe internationale. »
              </blockquote>

            </div>

          </div>

          {/* Second Row: Gabonese Youth Tech Developers Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-slate-800/80 pt-12">
            
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-block">
                Solutions d'Avenir
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Un Écosystème Numérique Libreville & Provinces
              </h2>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Digitalisation intégrale des démarches administratives et de facilitation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Inclusion financière par Mobile Money (Airtel Money & Moov Money).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Mentorat et formation accélérée pour les jeunes développeurs du Gabon.</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/hubs"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg inline-flex items-center gap-2"
                >
                  <span>Découvrir le Catalogue des Hubs</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-80 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl order-1 lg:order-2">
              <Image
                src="/images/gabonese_youth_tech.jpg"
                alt="Jeunes Développeurs Gabonais"
                fill
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
