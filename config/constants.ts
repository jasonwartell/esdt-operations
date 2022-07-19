// This configuration file keeps all UI constants and settings

// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title: 'Rewards Website - Elrond blockchain',
  description: 'GUI Website for reward program.',
  image: `${dappHostname}/og-image.png`,
};
