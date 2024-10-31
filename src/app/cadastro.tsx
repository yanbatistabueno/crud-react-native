import { useEffect, useState } from "react";
import { View, Button, Alert, FlatList, Text, TextInput } from "react-native";
import { router } from "expo-router";

import { Input } from "@/components/Input";
import { Product } from "@/components/Product";
import { Buttons } from "@/components/Buttons";

import {
  useProductDatabase,
  ProductDatabase,
} from "@/database/useProductDatabase";

export default function Index() {
  const [id, setId] = useState("");
  const [local, setName] = useState("");
  const [desc, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductDatabase[]>([]);

  const productDatabase = useProductDatabase();

  async function create() {
    try {
      const response = await productDatabase.create({
        local,
        desc,
      });

      Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId);
    } catch (error) {
      alert(error);
    }
  }

  // async function update() {
  //   try {
  //     const response = await productDatabase.update({
  //       id: Number(id),
  //       local,
  //       desc,
  //     });

  //     Alert.alert("Produto atualizado!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  function details(item: ProductDatabase) {
    setId(String(item.id));
    setName(item.local);
    setQuantity(String(item.desc));
  }

  async function handleSave() {
    if (id) {
      // update();
    } else {
      create();
    }

    setId("");
    setName("");
    setQuantity("");
    await list();
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>
      <Text style={{ fontSize: 36 }}>Cadastro de Viagem</Text>
      <Text>Local</Text>
      <Input onChangeText={setName} value={local} />
      <Text>Descrição</Text>
      <Input onChangeText={setQuantity} value={desc} />
      <View style={{ display: "flex", gap: 15 }}>
        <Buttons
          bgColor={"#007bff"}
          txtColor={"white"}
          txt={"Criar"}
          handleClick={handleSave}
        />
        <Buttons
          href={"/"}
          bgColor={"#6c757d"}
          txtColor={"white"}
          txt={"Cancelar"}
        />
      </View>

      {/* <Input placeholder="Pesquisar" onChangeText={setSearch} /> */}

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
