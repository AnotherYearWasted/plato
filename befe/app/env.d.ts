declare namespace NodeJS {
  interface ProcessEnv {
    DRIVER: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_NAMES: string;
    RETRY_WRITES: string;
    W: string;
    APP_NAME: string;
    // Add other environment variables as needed
  }
}