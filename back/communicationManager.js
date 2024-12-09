import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para registrar un usuario
async function registerUser(username, hashedPassword) {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const [result] = await pool.query(query, [username, hashedPassword]);
  return result;
}

// Función para buscar un usuario por su username
async function findUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.query(query, [username]);
  return rows[0]; // Devuelve el primer resultado (puede ser undefined)
}

export default communicationManager = {
  registerUser,
  findUserByUsername,
};