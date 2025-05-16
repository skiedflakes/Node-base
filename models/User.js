const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async create(name,username, password, email) {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user_tbl (name, username, password, email)  VALUES (?,?,?,?)';
    await db.execute(query, [name, username, password,email]);
  },

  async findByUsername(username) {
  const query = 'SELECT username, password FROM user_tbl WHERE username = ?';
  const [rows] = await db.execute(query, [username]);

  // If no user is found, return null
  if (rows.length === 0) return null;

  // Return the user object with username and password
  return {
    username: rows[0].username,
    password: rows[0].password
  };
}
,

  async getAllUsers(){
      const query = 'SELECT user_id, username FROM user_tbl';
    return db.execute(query);
  }
};

module.exports = User;
