/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_SUBSQUID_URL: string;
  readonly VITE_CUSTOM_RPC?: string;
  readonly VITE_GTM_CONTAINER_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
