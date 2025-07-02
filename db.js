import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection(process.env.DATABASE_URL + '?ssl={"rejectUnauthorized":true}');

db.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL via connection string');
});

export default db;
