/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_SUBSQUID_URL: string;
  readonly VITE_ALCHEMY_RPC: string;
  readonly VITE_ALCHEMY_ARBITRUM_RPC?: string;
  readonly VITE_ALCHEMY_BASE_RPC?: string;
  readonly VITE_ALCHEMY_OP_MAINNET_RPC?: string;
  readonly VITE_CUSTOM_RPC?: string;
  readonly VITE_CUSTOM_ARBITRUM_RPC?: string;
  readonly VITE_CUSTOM_BASE_RPC?: string;
  readonly VITE_CUSTOM_OP_MAINNET_RPC?: string;
  readonly VITE_GTM_CONTAINER_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@analytics/google-tag-manager';
