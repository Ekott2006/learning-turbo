import {drizzle} from 'drizzle-orm/postgres-js';
import * as schema from "./schema";
import "dotenv/config"

console.log(process.env.DATABASE_URL)

const db = drizzle({ connection:  process.env.DATABASE_URL!, schema });

export default db