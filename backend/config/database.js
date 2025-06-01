import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("Connecting to DB with:", {
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
});

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log("Database berhasil terkoneksi.");
  } catch (error) {
    console.error("Database gagal terkoneksi:", error);
  }
})();

export default db;
