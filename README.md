### ESDT Operations

The UI is built using Nextjs and a couple of helpful tools. It was developed by mashing Elrond Dev Guild's next-js-app-template and work by Julian Cwirko. 

### How to start it locally:
1. clone or download the repo
2. `cd esdt-operations`
3. `npm install`
4. configure .env.local
6. `npm run dev` -> for development
7. `npm run build` -> `npm start` for production

### Make a .env.local file in esdt-operations root folder
# .env.local
# =============================================
# Public variables (exposed on the frontend)
# =============================================

# Elrond chain (can be devnet, testnet, mainnet)
NEXT_PUBLIC_ELROND_CHAIN = devnet

# This is the masked/proxied public API endpoint
# only current instance of the Dapp can use it if only API_ALLOWED_DAPP_HOST is set
NEXT_PUBLIC_ELROND_API = /api

# This is basically the main domain of your dapp
NEXT_PUBLIC_DAPP_HOST = http://localhost:3000

# =============================================
# Private variables (used on backend)
# =============================================

# Your main Elrond API can be a custom one. There won't be a possibility
# to reveal this endpoint, it will be masked by NEXT_PUBLIC_ELROND_API
ELROND_CUSTOM_API = https://devnet-api.elrond.com

# Only this host will be allowed to consume the API (optional)
API_ALLOWED_DAPP_HOST = http://localhost:3000
# end .env.local

