'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TicketIcon,
  SearchIcon,
  MessageSquareIcon,
  CreditCardIcon,
  BuildingIcon,
  ShieldIcon
} from './Icons';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/suivi/${searchQuery.trim().toUpperCase()}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo Brand: O'LO Hub Portail Principal */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-md group-hover:scale-105 transition-all duration-300 flex items-center justify-center p-1.5">
                <Image
                  src="/images/logo_cropped.svg"
                  alt="O'LO Hub Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block">
                  O'LO Hub <span className="text-emerald-400 font-black">Gabon</span>
                </span>
                <span className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Portail Principal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-2.5 flex-1" aria-label="Navigation principale">
              
              {/* O'LO Hub Facilitation Prominent Link */}
              <Link
                href="/facilitation"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 transition-all shadow-sm transform hover:scale-105"
              >
                <ShieldIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>O'LO Hub Facilitation</span>
              </Link>

              {/* Hub Selection Dropdown */}
              <div className="relative group">
                <button
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:border-emerald-500 transition-all shadow-sm"
                >
                  <BuildingIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nos Hubs & Services</span>
                  <svg className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 -translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl space-y-1 text-xs">
                    <Link href="/facilitation" className="block px-3 py-2.5 rounded-xl font-bold text-white hover:bg-emerald-500/10 hover:text-emerald-400">
                      🛡️ O'LO Hub Facilitation Administrative
                      <span className="block text-[10px] text-slate-400 font-normal">ANPI, DGI, CNSS, Légalisation</span>
                    </Link>
                    <Link href="/nouveau-ticket?hub=entreprise" className="block px-3 py-2.5 rounded-xl font-bold text-white hover:bg-emerald-500/10 hover:text-emerald-400">
                      🏢 Hub Entreprises & IT
                      <span className="block text-[10px] text-slate-400 font-normal">SARL, NIF, conseil numérique</span>
                    </Link>
                    <Link href="/nouveau-ticket?hub=travail" className="block px-3 py-2.5 rounded-xl font-bold text-white hover:bg-emerald-500/10 hover:text-emerald-400">
                      💼 Hub Travail & Emploi
                      <span className="block text-[10px] text-slate-400 font-normal">Contrats & cotisations CNSS</span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/nouveau-ticket"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:border-emerald-500 transition-all shadow-sm"
              >
                <TicketIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nouveau Ticket</span>
              </Link>

              <Link
                href="/suivi"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:border-emerald-500 transition-all shadow-sm"
              >
                <SearchIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Suivre un Dossier</span>
              </Link>

              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:border-emerald-500 transition-all shadow-sm"
              >
                <MessageSquareIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Assistance Client</span>
              </Link>

            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Search Toggle Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-full border border-slate-700 bg-slate-800 text-slate-200 hover:text-emerald-400 hover:border-emerald-500 transition-all shadow-sm"
                aria-label="Rechercher un dossier"
              >
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Primary Action Button */}
              <Link
                href="/facilitation"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-105"
              >
                <ShieldIcon className="w-4 h-4" />
                <span>Lancer une Facilitation</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 border border-slate-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

            </div>

          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            <Link
              href="/facilitation"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
            >
              🛡️ O'LO Hub Facilitation Administrative
            </Link>
            <Link
              href="/nouveau-ticket"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-100 hover:bg-slate-800"
            >
              Nouveau Ticket
            </Link>
            <Link
              href="/suivi"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-100 hover:bg-slate-800"
            >
              Suivre un Dossier
            </Link>
            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-100 hover:bg-slate-800"
            >
              Assistance Client
            </Link>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Recherche de Ticket O'LO Hub</span>
              <button onClick={() => setSearchModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez votre code de ticket (ex: OLO-782910)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                Rechercher le Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
