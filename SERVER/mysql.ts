import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ABC12abc",
  database: "db_todos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
