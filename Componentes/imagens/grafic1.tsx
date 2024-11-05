import React from "react";
import { Image, View } from "react-native";

export default function Grafic1() {
  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/grfic1.png")}
        style={{ width: 250, height: 250 }}
      />
    </View>
  );
}
