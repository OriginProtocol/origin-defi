/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.csv' {
  const value: any;
  export default value;
}
