import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS viagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      local TEXT,
      desc TEXT
    );
  `);
}
