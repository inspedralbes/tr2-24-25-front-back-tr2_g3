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

// Función para buscar un usuario por su useremail
async function findUserByMail(useremail) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.query(query, [useremail]);
  return rows[0]; // Devuelve el primer resultado (puede ser undefined)
}

async function getAllPermissions() {
  const query = 'SELECT * FROM permissions';
  const [rows] = await pool.query(query);
  return rows;
}
async function getPermissionById(id) {
  const query = 'SELECT * FROM permissions WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows[0];
}

const communicationManager = {
  registerUser,
  findUserByMail,
  getAllPermissions,
  getPermissionById,
};

export default communicationManager;