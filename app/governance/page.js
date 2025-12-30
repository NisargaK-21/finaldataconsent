"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Vote, CheckCircle2 } from "lucide-react";

export default function GovernancePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [proposals, setProposals] = useState([
    {
      id: "DCP-12",
      title: "Add TikTok to Revocation List",
      status: "Active",
      votes: 1200,
      type: "Integration",
      hasVoted: false
    },
    {
      id: "DCP-11",
      title: "Upgrade SovereignGate v0.8.2",
      status: "Active",
      votes: 4500,
      type: "Core Protocol",
      hasVoted: false
    }
  ]);

  const handleVote = (id) => {
    setProposals(prev =>
      prev.map(p =>
        p.id === id && !p.hasVoted
          ? { ...p, votes: p.votes + 1, hasVoted: true }
          : p
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProposal = {
      id: crypto.randomUUID(), 
      title: formData.get("title"),
      status: "Active",
      votes: 0,
      type: formData.get("type"),
      hasVoted: false
    };

    setProposals(prev => [newProposal, ...prev]);
    setModalOpen(false);
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">


        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter">
            GOVERNANCE
          </h1>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            New Proposal
          </button>
        </div>

        <div className="space-y-4">
          {proposals.map(prop => (
            <motion.div
              key={prop.id} 
              layout
              className={`p-6 rounded-[2rem] border ${
                prop.hasVoted
                  ? "bg-indigo-500/10 border-indigo-500/50"
                  : "bg-slate-900/40 border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                    {prop.id}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold mt-1">
                    {prop.title}
                  </h3>

                  <div className="flex gap-4 mt-2 text-sm text-slate-400">
                    <span>{prop.type}</span>
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Vote size={14} />
                      {prop.votes.toLocaleString()} Votes
                    </span>
                  </div>
                </div>

                <button
                  disabled={prop.hasVoted}
                  onClick={() => handleVote(prop.id)}
                  className={`px-8 py-3 rounded-xl font-bold ${
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
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setModalOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-md"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
              >
                <h2 className="text-2xl font-black mb-6">
                  Create Proposal
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="title"
                    required
                    placeholder="Proposal Title"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-indigo-500 outline-none"
                  />

                  <select
                    name="type"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4"
                  >
                    <option>Integration</option>
                    <option>Core Protocol</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 py-4 rounded-xl font-bold hover:bg-indigo-500"
                  >
                    Submit Proposal
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
