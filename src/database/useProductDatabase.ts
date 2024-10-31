import { useSQLiteContext } from "expo-sqlite";

export type ProductDatabase = {
  id: number;
  local: string;
  desc: string;
};

export function useProductDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ProductDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO viagens (local, desc) VALUES ($local, $desc)"
    );

    try {
      const result = await statement.executeAsync({
        $local: data.local,
        $desc: data.desc,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByName(local: string) {
    try {
      const query = "SELECT * FROM viagens WHERE local LIKE ?";

      const response = await database.getAllAsync<ProductDatabase>(
        query,
        `%${local}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM viagens WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function count() {
    try {
      await database.execAsync("SELECT COUNT(*) AS total_itens FROM viagens;");
    } catch (error) {}
  }
  return { create, searchByName, remove, count };
}
