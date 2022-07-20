export const chain = 'devnet';

export const publicApi: { [key: string]: string } = {
  local: 'http://localhost:7950',
  testnet: 'https://testnet-api.elrond.com',
  devnet: 'https://devnet-api.elrond.com',
  mainnet: 'https://api.elrond.com',
};

export const shortChainId: { [key: string]: string } = {
  testnet: 'T',
  devnet: 'D',
  mainnet: '1',
};

export const elrondExplorer: { [key: string]: string } = {
  devnet: 'https://devnet-explorer.elrond.com',
  testnet: 'https://testnet-explorer.elrond.com',
  mainnet: 'https://explorer.elrond.com',
};

export const esdtTokenProperties = [
  'canFreeze',
  'canWipe',
  'canPause',
  'canMint',
  'canBurn',
  'canChangeOwner',
  'canUpgrade',
  'canAddSpecialRoles',
];

// Build in address for token issuance
export const builtInEsdtSC =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';

// Predefined one time payment for token issuance (EGLD amount)
export const issueTokenPayment = 0.05;

export const esdtOpertationsGasLimit = 60000000;
export const esdtLocalOpertationsGasLimit = 300000;
