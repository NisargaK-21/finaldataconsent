"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  LayoutDashboard,
  ShieldHalf,
  Wifi,
  Database,
  Cpu,
  Globe,
  Zap,
  ExternalLink
} from "lucide-react";

const GOOGLE_CLOUD_RPC = "https://blockchain.googleapis.com/v1/projects/gen-lang-client-0786087797/locations/us-central1/endpoints/ethereum-sepolia/rpc?key=AIzaSyDwqLPgJhFw9d5MA4lUbBihwANhtIifW_I";
const CONTRACT_ADDRESS = "0x529eea55255e9cec3e74af4a809610a5fe006c62";
const CONTRACT_ABI = [
  "function revokeConsent(address app) public",
  "function isRevoked(address user, address app) public view returns (bool)"
];
const SEPOLIA_CHAIN_ID = "0xaa36a7";

const MOCK_APPS = [
  { id: 1, name: "HealthTracker Pro", icon: <Heart size={20} />, address: "0x1111111111111111111111111111111111111111", desc: "Biometric & Heart Rate Data" },
  { id: 2, name: "Instagram (Meta)", icon: <Instagram size={20} />, address: "0x2222222222222222222222222222222222222222", desc: "Private Messaging & Media" },
  { id: 3, name: "X (Twitter)", icon: <Twitter size={20} />, address: "0x3333333333333333333333333333333333333333", desc: "Direct Messages & Metadata" },
  { id: 4, name: "Facebook", icon: <Facebook size={20} />, address: "0x4444444444444444444444444444444444444444", desc: "Ad Tracking & Browse History" }
];

export default function DataConsentDashboard() {
  const [account, setAccount] = useState("Not connected");
  const [block, setBlock] = useState("...");
  const [loadingId, setLoadingId] = useState(null);
  const [revokedApps, setRevokedApps] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(GOOGLE_CLOUD_RPC);
        const blockNumber = await provider.getBlockNumber();
        setBlock(blockNumber.toString());

        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            await syncChainState(accounts[0], provider);
          }
        }
      } catch (err) { console.error("Init error:", err); }
    };
    init();
  }, []);

  const syncChainState = async (user, provider) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const state = {};
    for (const app of MOCK_APPS) {
      try { state[app.id] = await contract.isRevoked(user, app.address); } 
      catch { state[app.id] = false; }
    }
    setRevokedApps(state);
  };

  const handleRevoke = async (appAddress, appName, id) => {
    try {
      if (!window.ethereum) return alert("MetaMask not found.");
      setLoadingId(id);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (chainId !== SEPOLIA_CHAIN_ID) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: SEPOLIA_CHAIN_ID }]
        });
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.revokeConsent(appAddress);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setRevokedApps(prev => ({ ...prev, [id]: true }));
        alert(`Consent revoked for ${appName}`);
      }
    } catch (err) {
      console.error(err);
      alert("Action failed. Ensure you have Sepolia ETH.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">

      <section className="pt-20 pb-16 px-4 md:px-10 bg-gradient-to-b from-indigo-950/20 to-[#020617]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              Web3 Privacy Layer
            </span>
            <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 tracking-tighter">
              Own Your Data. <br/><span className="text-indigo-500">Govern Your Privacy.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              DataConsent is a decentralized protocol built on Ethereum Sepolia that allows 
              users to revoke third-party access to their private information with cryptographic finality.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto p-4 md:p-10">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-slate-800 pb-10">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-600/20">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Control Center</h1>
              <p className="text-slate-500 text-xs uppercase tracking-widest">Active Smart Contract Sessions</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm">
              <Wifi size={16} className="text-emerald-400" />
              <span>Network:</span>
              <span className="font-mono text-emerald-400">Sepolia</span>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/30 px-5 py-2.5 rounded-2xl text-sm font-mono text-indigo-300">
              {account !== "Not connected" ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] shadow-xl">
              <h2 className="text-xl font-bold mb-2">Privacy Index</h2>
              <div className="text-5xl font-black mb-4">
                {Math.round((Object.values(revokedApps).filter(v => v === true).length / MOCK_APPS.length) * 100)}%
              </div>
              <div className="w-full bg-indigo-900/40 h-2 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(Object.values(revokedApps).filter(v => v === true).length / MOCK_APPS.length) * 100}%` }}
                   className="bg-white h-full"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem]">
              <h3 className="font-bold flex items-center gap-2 mb-6">
                <LayoutDashboard size={18} /> Chain Metadata
              </h3>
              <div className="space-y-4 text-xs font-mono text-slate-400">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Current Block</span>
                  <span className="text-indigo-400">{block}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Contract</span>
                  <span className="truncate ml-4">{CONTRACT_ADDRESS.slice(0,10)}...</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Price</span>
                  <span className="text-emerald-400">Optimal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 px-2">
              <ShieldHalf className="text-indigo-500" /> Authorized Third-Parties
            </h2>

            <AnimatePresence>
              {MOCK_APPS.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex flex-col sm:flex-row justify-between items-center gap-6 group hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        revokedApps[app.id] === true ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400 group-hover:scale-110"
                      }`}>
                      {app.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{app.name}</h4>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <Lock size={12} /> {app.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={loadingId !== null || revokedApps[app.id] === true}
                    onClick={() => handleRevoke(app.address, app.name, app.id)}
                    className={`w-full sm:w-auto font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg ${
                      revokedApps[app.id] === true ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/40" : "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                    }`}
                  >
                    {loadingId === app.id ? "Processing..." : revokedApps[app.id] === true ? "Status: Revoked" : "Revoke Data Access"}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                    <Cpu size={24}/>
                </div>
                <h3 className="text-xl font-bold mb-4">Smart Contract Logic</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Actions are executed via the <code>revokeConsent()</code> function on the Ethereum Virtual Machine (EVM), 
                    ensuring that no central authority can reverse your decision.
                </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                    <Globe size={24}/>
                </div>
                <h3 className="text-xl font-bold mb-4">Immutable Ledger</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Once revoked, the transaction is timestamped and permanently stored on the Sepolia Testnet, 
                    creating an auditable trail of your privacy preferences.
                </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                    <Zap size={24}/>
                </div>
                <h3 className="text-xl font-bold mb-4">Zero-Trust Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Your wallet private keys never leave your browser. DataConsent uses <code>Ethers.js</code> 
                    to securely sign transactions locally via MetaMask.
                </p>
            </div>
        </section>

      
      </div>
    </div>
  );
}