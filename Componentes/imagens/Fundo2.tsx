import React from "react";
import { Image, View } from "react-native";

export default function Logo() {
  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/Mountains.png")}
        style={{ width: "100%", height: "100%", opacity: 1 }}
      />
    </View>
  );
}
