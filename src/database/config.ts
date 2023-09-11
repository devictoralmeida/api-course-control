import "dotenv/config";
import { Client, ClientConfig } from "pg";

const config = (): ClientConfig => {
  if (process.env.NODE_ENV === "test") {
    return {
      user: "victo",
      password: "200694",
      host: "localhost",
      database: "course_test",
      port: 5432,
    };
  }

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB,
    port: parseInt(process.env.DB_PORT!),
  };
};

const client: Client = new Client(config());

export default client;
