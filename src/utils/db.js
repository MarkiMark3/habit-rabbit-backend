import { Sequelize } from "sequelize";

// export const client = new Sequelize({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   dialect: "postgres",
//   port: 5432,
// });

export const client = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // optional
});

client
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected via Sequelize");
  })
  .catch((err) => {
    console.error("❌ Connection error:", err.message);
  });
