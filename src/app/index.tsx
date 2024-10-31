import { View, Text } from "react-native";
import { Buttons } from "@/components/Buttons";

export default function HomeScreen() {
  return (
    <View
      style={{ display: "flex", flexDirection: "column", padding: 20, gap: 10 }}
    >
      <Text style={{ fontSize: 36 }}>Formulario de Viagens</Text>
      <Buttons
        txtColor={"white"}
        bgColor={"#007bff"}
        href={"/cadastro"}
        txt={"Novo Formulário"}
      />
      <Buttons
        txtColor={"white"}
        bgColor={"#17a2b8"}
        href={"/pesquisa"}
        txt={"Pesquisar Formulário"}
      />
      <Buttons
        txtColor={"black"}
        bgColor={"#ffc107"}
        href={"/dados"}
        txt={"Dados Totalizados"}
      />
    </View>
  );
}
