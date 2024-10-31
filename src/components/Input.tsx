import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={{
        backgroundColor: "white",
        padding: 5,
        borderColor: "#007bff",
        borderWidth: 2,
        borderRadius: 4,
        height: 30,
      }}
      {...rest}
    />
  );
}
