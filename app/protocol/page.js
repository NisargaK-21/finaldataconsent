"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Code2, 
  Database, 
  Lock, 
  Zap, 
  ArrowRight,
  Fingerprint,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";

export default function ProtocolPage() {
  const specs = [
    {
      title: "Smart Contract Architecture",
      desc: "The core logic is deployed as an immutable SovereignGate contract on the Ethereum Sepolia testnet.",
      icon: <Code2 className="text-indigo-400" />,
      details: ["Solidity ^0.8.0", "Gas-optimized Mappings", "Non-Custodial Design"]
    },
    {
      title: "Data Sovereignty Layer",
      desc: "Uses cryptographic proofs to manage consent. No central server stores your privacy preferences.",
      icon: <Fingerprint className="text-emerald-400" />,
      details: ["On-chain Verification", "Private Key Authorization", "Global State Consistency"]
    },
    {
      title: "Real-time Finality",
      desc: "Leverages the security of Ethereum to ensure that once access is revoked, it is permanent and auditable.",
      icon: <Zap className="text-amber-400" />,
      details: ["Transaction Receipts", "Event Emissions", "Public Ledger Audit"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">

        <header className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6"
          >
            <ShieldCheck size={14} /> The Technical Blueprint
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            The DataConsent <span className="text-indigo-500">Protocol</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            DataConsent is more than a dashboard. It is a decentralized protocol designed to 
            standardize how third-party applications request and respect user privacy on the blockchain.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {specs.map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-slate-700 transition-all"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                {spec.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{spec.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{spec.desc}</p>
              <ul className="space-y-2">
                {spec.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <CheckCircle2 size={12} className="text-indigo-500" /> {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <section className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden mb-24">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
            </div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">SovereignGate.sol</span>
          </div>
          <div className="p-8 font-mono text-sm overflow-x-auto">
            <pre className="text-slate-400 leading-relaxed">
              <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SovereignGate {
    // Mapping of (User Address => (App Address => Revoked Status))
    mapping(address => mapping(address => bool)) public isRevoked;

    /**
     * @dev Permanently revokes consent for a specific third-party application.
     * This action is recorded on the blockchain and cannot be reversed by central authorities.
     */
    function revokeConsent(address app) public {
        isRevoked[msg.sender][app] = true;
    }
}`}</code>
            </pre>
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Protocol Workflow</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Identity Binding", text: "Users connect their Ethereum wallet (MetaMask), establishing a cryptographic link between their on-chain identity and the protocol." },
              { step: "02", title: "Action Authorization", text: "When a 'Revoke' action is triggered, Ethers.js generates a transaction payload that must be signed by the user's private key." },
              { step: "03", title: "State Modification", text: "The transaction is broadcast to the Sepolia Network. Miners validate the request and update the smart contract mapping." },
              { step: "04", title: "Immutable Audit", text: "Third-party apps query the 'isRevoked' mapping. If true, they are programmatically denied access to the user's data stream." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="text-4xl font-black text-indigo-500/20 group-hover:text-indigo-500 transition-colors">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}



