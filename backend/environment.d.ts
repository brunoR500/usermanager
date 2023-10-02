declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: number;
      USER: string;
      USER_PASSWORD: string;
      DB: string;
      DIALECT: string;
    }
  }
}
export {};
