import React from "react";
import { Image, View } from "react-native";

export default function Grafic2() {
  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/grafic2.png")}
        style={{ width: 380, height: 280 }}
      />
    </View>
  );
}
