import "dotenv/config";
import { Client, ClientConfig } from "pg";

const config = (): ClientConfig => {
  if (process.env.NODE_ENV === "test") {
    return {
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASSWORD,
      host: process.env.DB_TEST_HOST,
      database: process.env.DB_TEST,
      port: 5432,
    };
  }

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB,
    port: 5432,
  };
};

const client: Client = new Client(config());

export default client;
