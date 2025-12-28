// lib/constants.js
export const CONTRACT_ADDRESS = "0xYour_Deployed_Contract_Address"; 

export const CONTRACT_ABI = [
  "event ConsentRevoked(address indexed user, address indexed app, uint256 timestamp)",
  "function revokeConsent(address app) public",
  "function isRevoked(address user, address app) public view returns (bool)"
];

// Use your Google Cloud Node URL here
export const RPC_URL = "https://ethereum-sepolia.blockchainnodeengine.com/v1/projects/YOUR_PROJECT_ID";