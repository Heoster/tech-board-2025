/// <reference types="vite/client" />

interface ImportMetaEnv {
  NODE_ENV: string;
  readonly VITE_API_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}