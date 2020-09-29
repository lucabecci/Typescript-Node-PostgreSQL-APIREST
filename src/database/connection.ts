import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config()
const pool = new Pool({
  connectionString: <string> process.env.DATABASE_URL
});

export default pool;
