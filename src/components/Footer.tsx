import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MailIcon, PhoneIcon, MapPinIcon, ShieldIcon } from './Icons';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1 shadow-md flex items-center justify-center">
              <Image
                src="/images/logo_cropped.svg"
                alt="O'LO Hub Logo"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white">O'LO Hub Gabon</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Votre plateforme unifiée de services digitaux au Gabon. Paiement sécurisé Mobile Money et suivi en temps réel.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <ShieldIcon className="w-4 h-4" />
            <span>Paiement Sécurisé & Confidentialité</span>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Accès Rapide</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/nouveau-ticket" className="hover:text-emerald-400 transition-colors">Créer un Ticket</Link></li>
            <li><Link href="/suivi" className="hover:text-emerald-400 transition-colors">Suivre un Dossier</Link></li>
            <li><Link href="/support" className="hover:text-emerald-400 transition-colors">Assistance Client</Link></li>
          </ul>
        </div>

        {/* Col 3: Hubs */}
        <div>
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Nos Hubs</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Hub Entreprises & ANPI</li>
            <li>Hub Fiscalité & DGI</li>
            <li>Hub Sécurité Sociale (CNSS)</li>
            <li>Hub Actes & Légalisation</li>
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Contact & Support</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-3">
              <MapPinIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Libreville, Gabon</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+241 077 51 96 44</span>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>contact@olo-hub.ga</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 O'LO Hub Gabon. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="/support" className="hover:text-slate-300">Assistance Client</Link>
          <Link href="/suivi" className="hover:text-slate-300">Suivi Dossier</Link>
        </div>
      </div>
    </footer>
  );
}
