import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck, Github, Twitter, Globe } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DataConsent | Sovereign Privacy",
  description: "Decentralized data permission management on Ethereum Sepolia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-100`}
      >

        <nav className="border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-indigo-500" size={24} />
              <span className="font-black text-xl tracking-tight">DataConsent</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/protocol" className="hover:text-white transition-colors">Protocol</Link>
              <Link href="/governance" className="hover:text-white transition-colors">Governance</Link>
              <Link href="/audit" className="hover:text-white transition-colors">Audit</Link>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all">
              Launch App
            </button>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-slate-800 bg-slate-950/50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="text-indigo-500" size={28} />
                  <span className="font-black text-2xl tracking-tight">DataConsent</span>
                </div>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                  The worlds first open-source privacy layer for the decentralized web. 
                  Built to ensure that users, not corporations, own their digital identity.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Resources</h4>
                <ul className="text-slate-500 text-sm space-y-2">
                  <li className="hover:text-indigo-400 cursor-pointer transition-colors">Smart Contracts</li>
                  <li className="hover:text-indigo-400 cursor-pointer transition-colors">Developer Docs</li>
                  <li className="hover:text-indigo-400 cursor-pointer transition-colors">API Reference</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Community</h4>
                <div className="flex gap-4">
                  <Twitter size={20} className="text-slate-400 hover:text-indigo-400 cursor-pointer" />
                  <Github size={20} className="text-slate-400 hover:text-indigo-400 cursor-pointer" />
                  <Globe size={20} className="text-slate-400 hover:text-indigo-400 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-900 flex justify-between items-center text-xs text-slate-600 font-mono">
              <p>© 2025 DATACONSENT PROTOCOL. DEPLOYED ON SEPOLIA.</p>
              <div className="flex gap-4">
                <span>PRIVACY POLICY</span>
                <span>TERMS OF SERVICE</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}