import React from "react";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function Carrossel() {
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const width = Dimensions.get("window").width;
  const DATA = [
    {
      image: require("../../assets/slide1.png"),
      link: "https://rockcontent.com/br/blog/aumentar-taxa-de-conversao/",
    },
    {
      image: require("../../assets/slide2.png"),
      link: "https://sebrae.com.br/sites/PortalSebrae/artigos/conheca-as-8-principais-tecnicas-de-vendas,a4f0bbd7f0f07810VgnVCM1000001b00320aRCRD",
    },
    {
      image: require("../../assets/slide3.png"),
      link: "https://www.inhouse.com.br/a-importancia-da-empatia-no-atendimento-ao-cliente/#:~:text=Empatia%20no%20atendimento%20ao%20cliente%20significa%20a%20capacidade%20de%20compreender,uma%20conex%C3%A3o%20genu%C3%ADna%20e%20humana.",
    },
  ];

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        width={width}
        height={width / 2}
        data={DATA}
        autoPlay={true}
        pagingEnabled={pagingEnabled}
        scrollAnimationDuration={3000}
        renderItem={({ item }) => (
          <Pressable
            style={styles.CarouselItem}
            onPress={() => handlePress(item.link)}
          >
            <Image style={styles.img} source={item.image} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  CarouselItem: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 10,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
