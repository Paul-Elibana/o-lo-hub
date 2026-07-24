'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isScaledUp, setIsScaledUp] = useState(false);

  useEffect(() => {
    const scaleTimer = setTimeout(() => {
      setIsScaledUp(true);
    }, 100);

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(scaleTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft aura background */}
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>

      <div
        className={`relative z-10 flex flex-col items-center text-center space-y-6 transition-all duration-700 ease-out transform ${
          isScaledUp ? 'scale-100 opacity-100' : 'scale-85 opacity-0'
        }`}
      >
        {/* Logo Container */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-slate-900 p-4 border border-slate-700 shadow-2xl flex items-center justify-center">
          <Image
            src="/images/logo_cropped.svg"
            alt="O'LO Hub Logo"
            width={90}
            height={90}
            priority
            className="object-contain"
          />
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            O'LO Hub <span className="text-emerald-400 font-black">Gabon</span>
          </h1>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Votre Portail Unifié de Services
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-44 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
          <div className="h-full bg-emerald-500 rounded-full animate-[splashProgress_1.4s_ease-in-out_infinite]"></div>
        </div>

      </div>
    </div>
  );
}
