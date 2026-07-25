'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SearchIcon,
  MessageSquareIcon,
  BuildingIcon,
  ShieldIcon,
  PhoneIcon,
  SparklesIcon,
  ArrowRightIcon
} from './Icons';

interface NavigationLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationLinks: NavigationLink[] = [
    { label: "Accueil", href: "/" },
    { label: "Catalogue des Hubs", href: "/hubs" },
    { label: "Vision Ogooué Labs", href: "/vision" },
    { label: "Assistance", href: "/support" },
    { label: "Mon Compte", href: "/comptes" }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/suivi/${searchQuery.trim().toUpperCase()}`;
    }
  };

  return (
    <>
      {/* Digital Arc Style Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-6">
            
            {/* Digital Arc Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 p-1 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                <Image
                  src="/images/logo_cropped.svg"
                  alt="O'LO Hub Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tighter text-white block uppercase">
                  O'LO Hub <span className="text-emerald-400">Gabon</span>
                </span>
                <span className="block text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Portail Ogooué Labs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Digital Arc Monospace Uppercase Style) */}
            <nav className="hidden lg:flex items-center justify-center gap-8 flex-1 px-4" aria-label="Navigation principale">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300 hover:text-white transition-colors relative py-1 hover:border-b-2 hover:border-emerald-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Digital Arc Action Controls */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Search Square Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
                aria-label="Rechercher un dossier"
              >
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Primary Action Button: Digital Arc Pill + Rotating Arrow */}
              <Link
                href="/facilitation"
                className="hidden sm:flex group items-center gap-2 pl-5 pr-2 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-lg"
              >
                <span>Hub Facilitation</span>
                <div className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:rotate-[312deg] transition-transform duration-300">
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full text-slate-300 hover:text-white bg-slate-900 border border-slate-800 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-emerald-400 py-2 border-b border-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/facilitation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 mt-3"
            >
              <span>Accéder au Hub Facilitation</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Recherche de Dossier O'LO Hub</span>
              <button onClick={() => setSearchModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez votre code de ticket (ex: OLO-782910)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-mono font-bold text-slate-950 bg-white hover:bg-slate-100 transition-colors uppercase tracking-wider"
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
