/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_SUBSQUID_URL: string;
  readonly VITE_ALCHEMY_RPC: string;
  readonly VITE_ALCHEMY_ARBITRUM_RPC?: string;
  readonly VITE_ALCHEMY_BASE_RPC?: string;
  readonly VITE_ALCHEMY_OP_MAINNET_RPC?: string;
  readonly VITE_ALCHEMY_SONIC_MAINNET_RPC?: string;
  readonly VITE_CUSTOM_RPC?: string;
  readonly VITE_CUSTOM_ARBITRUM_RPC?: string;
  readonly VITE_CUSTOM_BASE_RPC?: string;
  readonly VITE_CUSTOM_OP_MAINNET_RPC?: string;
  readonly VITE_CUSTOM_SONIC_RPC?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_STRAPI_URL: string;
  readonly VITE_STRAPI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
