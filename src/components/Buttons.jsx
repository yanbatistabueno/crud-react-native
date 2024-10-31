import { Link } from "expo-router";
import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
Link;

export const Buttons = (props) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.bgColor,
      padding: 12,
      borderRadius: 4,
    },
  });
  return (
    <View>
      {props.href ? (
        <Link href={props.href} asChild>
          <Pressable style={styles.button}>
            <Text style={{ color: props.txtColor }}>{props.txt}</Text>
          </Pressable>
        </Link>
      ) : (
        <Pressable onPress={props.handleClick} style={styles.button}>
          <Text style={{ color: props.txtColor }}>{props.txt}</Text>
        </Pressable>
      )}
    </View>
  );
};
