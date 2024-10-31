import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";

import { Product } from "@/components/Product";
import { Buttons } from "@/components/Buttons";

import {
  useProductDatabase,
  ProductDatabase,
} from "@/database/useProductDatabase";

export default function Index() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductDatabase[]>([]);
  const productDatabase = useProductDatabase();

  async function list() {
    try {
      const response = await productDatabase.searchByName(search);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(id: number) {
    try {
      await productDatabase.remove(id);
      await list();
    } catch (error) {
      console.log(error);
    }
  }

  async function count() {
    try {
      const response = await productDatabase.count;
    } catch (error) {}
  }

  useEffect(() => {
    list();
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>
      <Text style={{ fontSize: 36 }}>Dados Totalizados dos Formularios</Text>
      <Text>Total de viagens: {Object.keys(products).length}</Text>
      <Buttons
        href={"/"}
        bgColor={"#6c757d"}
        txtColor={"white"}
        txt={"Voltar"}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={item}
            onPress={() => console.log()}
            onDelete={() => remove(item.id)}
            onOpen={() => console.log()}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}
