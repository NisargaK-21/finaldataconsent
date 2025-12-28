"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Vote, CheckCircle2, X } from "lucide-react";

export default function GovernancePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [proposals, setProposals] = useState([
    { id: "DCP-12", title: "Add TikTok to Revocation List", status: "Active", votes: 1200, type: "Integration", hasVoted: false },
    { id: "DCP-11", title: "Upgrade SovereignGate v0.8.2", status: "Active", votes: 4500, type: "Core", hasVoted: false }
  ]);

  const handleVote = (id) => {
    setProposals(currentProposals => 
      currentProposals.map(p => 
        p.id === id ? { ...p, votes: p.votes + 1, hasVoted: true } : p
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProp = {
      id: `DCP-${proposals.length + 10}`,
      title: formData.get("title") || "New Proposal",
      status: "Active",
      votes: 0,
      type: formData.get("type"),
      hasVoted: false
    };
    setProposals([newProp, ...proposals]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter">GOVERNANCE</h1>
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95"
          >
            <PlusCircle size={18} /> New Proposal
          </button>
        </div>

        <div className="space-y-4">
          {proposals.map((prop) => (
            <motion.div 
              layout
              key={prop.id} 
              className={`p-6 rounded-[2rem] border transition-colors duration-500 ${
                prop.hasVoted ? "bg-indigo-500/10 border-indigo-500/50" : "bg-slate-900/40 border-slate-800"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono text-indigo-400 mb-1 block uppercase tracking-widest">{prop.id}</span>
                  <h3 className="text-xl font-bold">{prop.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm font-medium">
                    <span className="text-slate-500">{prop.type}</span>
                    <motion.span 
                      key={prop.votes}
                      initial={{ scale: 1.2, color: "#818cf8" }}
                      animate={{ scale: 1, color: "#818cf8" }}
                      className="flex items-center gap-1"
                    >
                      <Vote size={14}/> {prop.votes.toLocaleString()} Votes
                    </motion.span>
                  </div>
                </div>

                <button 
                  disabled={prop.hasVoted}
                  onClick={() => handleVote(prop.id)}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${
                    prop.hasVoted 
                      ? "bg-emerald-500/20 text-emerald-400 cursor-not-allowed" 
                      : "bg-white text-black hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  {prop.hasVoted ? <CheckCircle2 size={20} /> : "Vote"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isModalOpen && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
               <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
                 <h2 className="text-2xl font-black mb-6">Create Proposal</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <input name="title" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-colors" placeholder="Proposal Title" />
                   <select name="type" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none">
                     <option>Integration</option>
                     <option>Core Protocol</option>
                   </select>
                   <button type="submit" className="w-full bg-indigo-600 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all active:scale-95">Submit Proposal</button>
                 </form>
               </motion.div>
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}