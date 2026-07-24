import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ZammadWidget } from '@/components/ZammadWidget';
import { SplashScreen } from '@/components/SplashScreen';

export const metadata: Metadata = {
  title: "O'LO Hub Gabon | Facilitation Administrative, eBilling & Support Zammad",
  description: "Plateforme digitale numéro 1 au Gabon pour vos démarches ANPI, DGI, CNSS et légalisation de documents. Paiement Mobile Money eBilling et suivi en temps réel.",
  keywords: ["O'LO Hub", "Gabon", "ANPI", "DGI", "CNSS", "eBilling", "Airtel Money", "Moov Money", "Zammad", "Facilitation Administrative"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Outfit',sans-serif] min-h-screen flex flex-col justify-between antialiased bg-slate-900 text-slate-100">
        <SplashScreen />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <ZammadWidget />
        <Footer />
      </body>
    </html>
  );
}
