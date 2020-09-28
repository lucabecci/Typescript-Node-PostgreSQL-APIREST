import { Pool } from "pg";

const pool = new Pool({
  user: <string> "postgres",
  host: <string> "localhost",
  password: <string> "password",
  database: <string> "apitypescript",
  port: <number> 5432,
});

export default pool;
