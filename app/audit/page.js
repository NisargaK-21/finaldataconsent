"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  ShieldAlert, 
  ExternalLink, 
  Server, 
  Zap, 
  Lock 
} from "lucide-react";

export default function AuditPage() {
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6"
          >
            <Activity size={14} className="animate-pulse" /> Live Verification Stream
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Protocol <span className="text-indigo-500">Audit</span> Log
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Real-time proof of data revocations processed via the SovereignGate smart contract and Google Cloud nodes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Network Status", val: "Operational", icon: <Server className="text-emerald-400" /> },
            { label: "Node Provider", val: "Google Cloud", icon: <Zap className="text-amber-400" /> },
            { label: "Active Blocks", val: "Sepolia #68294", icon: <Lock className="text-indigo-400" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                {stat.icon}
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">Global Revocation Events</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
          </div>

          <div className="p-8 min-h-[400px]">
            {isSyncing ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-4">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-mono animate-pulse">Syncing with Google Cloud Node...</p>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex gap-6 items-start p-6 rounded-3xl bg-slate-900/20 border border-transparent hover:border-slate-800 hover:bg-slate-900/40 transition-all mb-4"
                >
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <ShieldAlert size={20} className="text-red-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">Access_Severed</span>
                        <h3 className="text-lg font-bold mt-2">0x742d...44e <span className="text-slate-500 font-medium">blocked</span> AdSense_API</h3>
                      </div>
                      <span className="text-xs font-mono text-slate-600">2 mins ago</span>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                      On-chain proof generated. Third-party access to biometric and location streams has been programmatically denied via smart contract mapping.
                    </p>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Block: 6,829,142
                      </div>
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">
                        Verify on Etherscan <ExternalLink size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>

              </AnimatePresence>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            Secured by SovereignGate Protocol & Google Cloud Infrastructure
          </p>
        </footer>
      </div>
    </div>
  );
}