import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12746400',
  password: 'bTD4HjqwgM',
  database: 'sql12746400',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;