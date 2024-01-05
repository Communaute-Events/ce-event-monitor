export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        sourcesUrl: string,
        token: string,
        port: any
    }
  }
}
