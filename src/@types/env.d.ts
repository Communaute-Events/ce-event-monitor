export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        token: string,
        port: any
    }
  }
}
