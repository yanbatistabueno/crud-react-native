import { PressableProps, Text, View } from "react-native";
import { Buttons } from "./Buttons";
type Props = PressableProps & {
  data: {
    local: string;
    desc: string;
  };
  onDelete: () => void;
  onOpen: () => void;
};

export function Product({ data, onDelete, onOpen, ...rest }: Props) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CECECE",
        justifyContent: "space-between",
      }}
      {...rest}
    >
      <View style={{ gap: 20 }}>
        <Text
          style={{ flex: 1, fontWeight: "bold", fontSize: 25, maxWidth: 100 }}
        >
          {data.local}
        </Text>
        <Text style={{ flex: 1 }}>{data.desc}</Text>
      </View>
      <Buttons
        bgColor={"red"}
        txtColor={"white"}
        txt={"Apagar"}
        handleClick={onDelete}
      />
    </View>
  );
}
