import { createConnection } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD.replace(/"/g, ''), // remove quotes if present
  database: process.env.DB_NAME,
  port: 25061, // Aiven's default MySQL port
  ssl: {
    rejectUnauthorized: true // Aiven requires SSL
  }
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to Aiven MySQL');
});

export default db;
