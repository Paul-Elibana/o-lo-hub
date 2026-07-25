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
  ShieldIcon,
  PhoneIcon,
  SparklesIcon
} from './Icons';

interface NavigationLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationLinks: NavigationLink[] = [
    {
      label: "Accueil",
      href: "/",
      icon: <BuildingIcon className="w-4 h-4 text-emerald-400" />
    },
    {
      label: "Catalogue des Hubs",
      href: "/hubs",
      icon: <SparklesIcon className="w-4 h-4 text-amber-400" />
    },
    {
      label: "Vision Ogooué Labs",
      href: "/vision",
      icon: <ShieldIcon className="w-4 h-4 text-emerald-400" />
    },
    {
      label: "Assistance & Support",
      href: "/support",
      icon: <MessageSquareIcon className="w-4 h-4 text-emerald-400" />
    },
    {
      label: "Mon Compte",
      href: "/comptes",
      icon: <PhoneIcon className="w-4 h-4 text-emerald-400" />
    }
  ];

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
          <div className="flex items-center justify-between h-20 gap-6">
            
            {/* Logo Brand: O'LO Hub Portail Numérique Ogooué Labs */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-md group-hover:scale-105 transition-all duration-300 flex items-center justify-center p-1.5">
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
                  Portail Ogooué Labs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-4 flex-1 px-4" aria-label="Navigation principale">
              {navigationLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm ${
                      link.href === '/comptes'
                        ? 'border border-emerald-500/30 bg-slate-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500'
                        : 'border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:border-emerald-500'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>

                  {/* Add vertical separator between navigation sections */}
                  {index < navigationLinks.length - 1 && (index === 0 || index === 2) && (
                    <div
                      role="separator"
                      aria-orientation="vertical"
                      className="bg-slate-800/90 my-auto h-5 w-px shrink-0"
                    />
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3.5 shrink-0">
              
              {/* Search Toggle Square Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-emerald-400 hover:border-emerald-500 transition-all shadow-sm"
                aria-label="Rechercher un dossier"
              >
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Primary Action Square Button: Hub de Facilitation Actif */}
              <Link
                href="/facilitation"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-105"
              >
                <ShieldIcon className="w-4 h-4" />
                <span>Hub Facilitation</span>
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
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
            {navigationLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-100 hover:bg-slate-800"
                >
                  {link.label}
                </Link>

                {index < navigationLinks.length - 1 && (index === 0 || index === 2) && (
                  <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="bg-slate-800/80 -mx-1 my-1.5 h-px w-full"
                  />
                )}
              </React.Fragment>
            ))}
            <Link
              href="/facilitation"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 mt-2"
            >
              Lancer une Facilitation
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
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
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
