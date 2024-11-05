import React from "react";
import { Image, View } from "react-native";

export default function Person() {
  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <Image source={require("../../assets/profileP.png")} style={{}} />
    </View>
  );
}
