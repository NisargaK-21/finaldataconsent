# 🛡️ DataConsent — Decentralized Privacy Layer

**Take control of your data. Own your privacy.**

DataConsent is a modern, open-source Web3 privacy protocol that empowers users to own and govern their personal data. Using blockchain technology and smart contracts, DataConsent allows individuals to revoke third-party access to private information with cryptographic immutability — without reliance on any central authority.

**[🚀 Live Demo](https://finaldataconsent.vercel.app/)** | **[📖 Documentation](https://finaldataconsent.vercel.app/protocol)** | **[🏛️ Governance](https://finaldataconsent.vercel.app/governance)**

---

## ✨ Why DataConsent?

In today's digital ecosystem, your personal data is continuously harvested, sold, and misused by tech companies. DataConsent flips the script:

- **You own your data** — Not corporations, not intermediaries. You.
- **Revoke instantly** — No waiting for privacy teams or legal processes.
- **Cryptographically secure** — Backed by Ethereum blockchain for immutability.
- **Zero-trust architecture** — Private keys never leave your browser.
- **Transparent & auditable** — Every action is recorded on-chain.

---

## 🚀 Key Features

### 🔑 User-Centric Privacy Controls
- **Connect your wallet** (MetaMask, WalletConnect, etc.) to manage your privacy preferences
- **View active sessions** — See which smart contracts currently have access to your data
- **Real-time dashboard** — Monitor all authorized third parties in one place

### ❌ Revoke Third-Party Access
- **Instant revocation** — Withdraw consent from apps, platforms, and services instantly
- **On-chain execution** — Revocations are permanently recorded on Ethereum Sepolia
- **No delays** — No central authority can prevent or delay your revocation

### ⛓️ Immutable Privacy Ledger
- **Permanent records** — Every revocation is timestamped and stored on-chain
- **Cryptographic finality** — Once submitted, revocations cannot be altered
- **Full auditability** — Track your entire privacy history transparently

### 🛡️ Zero-Trust Security
- **Client-side signing** — All cryptographic operations happen in your browser using Ethers.js
- **Private key isolation** — Your private keys never leave your device
- **MetaMask integration** — Battle-tested wallet security

### 📊 Privacy Analytics (Coming Soon)
- **Privacy score** — Monitor your overall data exposure
- **Risk assessment** — Get alerts when new third parties request access
- **Data consent history** — Review all past and present data sharing agreements

---

## 🔧 Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 16, React 19, TailwindCSS 4 |
| **Blockchain** | Ethereum Sepolia Testnet, Solidity Smart Contracts |
| **Web3 Integration** | Ethers.js 6, MetaMask |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Styling** | PostCSS, TailwindCSS |

---

## 🧠 How It Works

```
┌─────────────────────────────────────────────────┐
│  User Browser (Zero-Trust Environment)          │
├─────────────────────────────────────────────────┤
│  1. User connects MetaMask wallet                │
│  2. Signs privacy preference locally             │
│  3. Ethers.js encodes transaction                │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  Ethereum Sepolia Testnet                       │
├─────────────────────────────────────────────────┤
│  Smart Contract receives revocation              │
│  - Invalidates third-party access               │
│  - Emits immutable log event                     │
│  - Updates user's privacy state                  │
└─────────────────────────────────────────────────┘
```

### Core Components

1. **Smart Contracts** — Solidity contracts deployed on Sepolia that manage privacy revocations
2. **Front-end UI** — Next.js app for wallet connection and consent management
3. **Immutable Ledger** — Ethereum blockchain serves as the source of truth
4. **Governance Module** — Framework for community-driven protocol decisions (coming soon)
5. **Audit Trail** — Complete transparency for security audits and compliance

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **MetaMask** or compatible Web3 wallet
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/finaldataconsent.git
cd finaldataconsent

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

---

## 🧑‍💻 How to Use DataConsent

### Step 1: Connect Your Wallet
1. Visit the [live demo](https://finaldataconsent.vercel.app/)
2. Click **"Connect Wallet"** in the navigation bar
3. Approve the connection in MetaMask

### Step 2: View Your Privacy Dashboard
- See all active sessions with authorized third parties
- Review the scope of data access for each session
- Check transaction history and timestamps

### Step 3: Revoke Access
1. Navigate to an authorized third party you want to disconnect
2. Click **"Revoke Access"** button
3. Confirm the transaction in MetaMask
4. Wait for confirmation (typically 15-30 seconds)
5. Your revocation is now immutably recorded on-chain

### Step 4: Verify On-Chain
- Every transaction is verifiable on the [Sepolia Testnet Explorer](https://sepolia.etherscan.io/)
- Copy your transaction hash and search to see cryptographic proof
- Share your transaction history with compliance teams if needed

---

## 📁 Project Structure

```
finaldataconsent/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout component
│   ├── page.js                   # Home page
│   ├── globals.css               # Global styles
│   ├── audit/
│   │   └── page.js              # Audit logs page
│   ├── governance/
│   │   └── page.js              # Governance dashboard
│   ├── protocol/
│   │   └── page.js              # Protocol documentation
│   └── lib/
│       └── constants.js          # App constants
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.mjs              # Next.js configuration
├── tailwind.config.mjs           # TailwindCSS config
├── postcss.config.mjs            # PostCSS config
├── eslint.config.mjs             # ESLint rules
├── jsconfig.json                 # JavaScript config
└── README.md                     # This file
```

---

## 🧪 Blockchain Configuration

### Ethereum Sepolia Testnet
| Property | Value |
|----------|-------|
| **Network** | Sepolia (Ethereum Testnet) |
| **Chain ID** | 11155111 |
| **RPC Endpoint** | `https://sepolia.infura.io/v3/YOUR_KEY` |
| **Explorer** | [Sepolia Etherscan](https://sepolia.etherscan.io/) |
| **Testnet ETH Faucets** | [Sepolia Faucet](https://www.sepoliaethfaucet.io/) |

All privacy revocations and consent management operations are executed and recorded on Sepolia for auditability and immutability.

---

## 📜 Smart Contract Interface

### Core Functions

```solidity
// Revoke consent for a specific third party
function revokeConsent(address thirdParty) external

// Get list of all authorized third parties for a user
function getAuthorizedParties(address user) external view returns (address[])

// Calculate user's privacy score based on active consents
function privacyIndex(address user) external view returns (uint256)

// Grant consent to a third party
function grantConsent(address thirdParty, bytes32 dataScope) external

// Check if a third party has active consent
function hasConsent(address user, address thirdParty) external view returns (bool)
```

---

## 🌐 Environment Variables

Create a `.env.local` file with the following:

```env
# Ethereum RPC Provider
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Contract Addresses
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# MetaMask Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
```

---

## 🗺️ Roadmap

- ✅ Core privacy revocation functionality
- ✅ MetaMask wallet integration
- 🔄 **In Progress**: Enhanced governance dashboard
- 🔄 **In Progress**: Advanced audit trail features
- 📅 **Planned**: Multi-chain support (Arbitrum, Polygon)
- 📅 **Planned**: DAO governance token
- 📅 **Planned**: Privacy-preserving zkProofs
- 📅 **Planned**: Enterprise privacy solutions

---

## 🤝 Contributing

We welcome contributions! DataConsent is an open-source project built by the community, for the community.

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please ensure your code follows our [coding standards](./CONTRIBUTING.md) and includes tests.

---

## 📚 Documentation

- **[Protocol Documentation](https://finaldataconsent.vercel.app/protocol)** — Deep dive into how DataConsent works
- **[Governance Guide](https://finaldataconsent.vercel.app/governance)** — Participate in protocol decisions
- **[Audit Reports](https://finaldataconsent.vercel.app/audit)** — Security and compliance audits

---

## 🔒 Security & Privacy

DataConsent is built with privacy and security as first-class concerns:

- **No server-side tracking** — We don't store or collect user data
- **Client-side signing** — All cryptographic operations are local
- **Open-source auditing** — Code is publicly available for review
- **Regular security audits** — Third-party audits ensure protocol integrity
- **Bug bounty program** — Report vulnerabilities responsibly

⚠️ **Important**: This is a testnet application. Do not use with real assets or sensitive data.


---

## 📧 Support & Community

- **Discord** — Join our community server (coming soon)
- **Twitter** — [@DataConsent](https://twitter.com/dataconsent)
- **GitHub Issues** — Report bugs or request features
- **Email** — contact@dataconsent.io

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- Powered by [Ethereum](https://ethereum.org/) blockchain
- UI crafted with [TailwindCSS](https://tailwindcss.com/) and [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide React](https://lucide.dev/)

---

**DataConsent: Your Data, Your Rules, Your Privacy. 🔐**

**[Visit Live Demo →](https://finaldataconsent.vercel.app/)**
