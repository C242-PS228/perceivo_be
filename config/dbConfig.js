import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  // environment data
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'popo',
  password: process.env.DB_PASS || 'rootme',
  database: process.env.DB_NAME || 'perceivodb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;