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

// Función para buscar un usuario por su useremail
async function findUserByMail(useremail) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.query(query, [useremail]);
  return rows[0]; // Devuelve el primer resultado (puede ser undefined)
}

// Función para registrar un usuario
async function registerUser(username, email, hashedPassword, permission_type_id) {
  const query = 'INSERT INTO users (username, email, password, permission_type_id	) VALUES (?, ?, ?, ?)';
  const [result] = await pool.query(query, [username, email, hashedPassword, permission_type_id]);
  return result;
}

async function updateUser(userId, newEmail, newUsername) {
  const query = 'UPDATE users SET email = ?, username = ? WHERE id = ?';
  const [result] = await pool.query(query, [newEmail, newUsername, userId]);
}

async function modifyPermission(email, permission_type_id) {
  const query = 'UPDATE users SET permission_type_id = ? WHERE email = ?';
  const [result] = await pool.query(query, [permission_type_id, email]);
}

async function getAllPermissions() {
  const query = 'SELECT * FROM permission_types';
  const [rows] = await pool.query(query);
  return rows;
}
async function getPermissionById(id) {
  const query = 'SELECT * FROM permission_types WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows[0];
}

const communicationManager = {
  registerUser,
  findUserByMail,
  getAllPermissions,
  getPermissionById,
  modifyPermission,
};

export default communicationManager;