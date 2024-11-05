import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileScreenProp, ResultadoPerfilRouteProp } from "../../@types";
import Logo from "../../Componentes/imagens/Logo";
import { ArrowLeft } from "lucide-react-native";
import styles from "./styles";
import { useAuth } from "../../Context/AuthContext";
import { scheduleNotification } from "../../lib/notification";

const perfilInfo = {
  Diplomático: {
    imagem: require("../../assets/person1.png"),
    descricao:
      "Gostam da companhia de outras pessoas e muitas vezes exercem um papel mais de ouvintes, especialmente para os expressivos, que os apreciam por escutá-los. São leais e têm paciência em lidar com o outro. Justamente por isso, gastam muito tempo mantendo e construindo relacionamentos e deixando as atividades de lado. Devido à necessidade de segurança, não gostam de assumir situações de risco e se colocam em um papel passivo.",
  },
  Expressivo: {
    imagem: require("../../assets/person2.png"),
    descricao:
      "Os expressivos possuem alta capacidade de resposta, alta emotividade e alta assertividade. Têm necessidade básica de reconhecimento. Assim como os diplomáticos, gostam da companhia de outras pessoas, mas a diferença é que os expressivos precisam falar deles mesmos. Ele é expansivo, extrovertido, gosta de ser tratado com informalidade. Portanto, as melhores técnicas de vendas para esse tipo de pessoa baseiam-se num relacionamento intenso, mas claro, em um nível profissional.",
  },
  Pragmático: {
    imagem: require("../../assets/person3.png"),
    descricao:
      "Os pragmáticos apresentam baixa emotividade e alta assertividade. São geralmente orientados para realizar tarefas e esperam a mesma eficiência deles nos outros. Têm a necessidade básica de se manter no controle. Não enfatizam muito a construção de relacionamentos com outras pessoas e muitas vezes são vistos como agressivos e indiferentes, em especial pelos diplomáticos. São pessoas que geralmente são chamadas para assumir riscos, pois em circunstâncias conflituosas eles passam por cima de qualquer obstáculo.",
  },
};

export default function ResultadoPerfil() {
  const route = useRoute<ResultadoPerfilRouteProp>();
  const navigationPerfil = useNavigation<ProfileScreenProp>();
 

  const perfil = route.params?.perfil;
  const perfilData = perfil ? perfilInfo[perfil] : null;
  
  useEffect(() => {
    if (perfilData) {
      scheduleNotification(
        "Resultado do Teste Disponível!",
        `Seu resultado para o perfil profissional está pronto. Confira os detalhes!`
      );
    }
  }, [perfilData, scheduleNotification]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.centeredContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigationPerfil.goBack()}>
            <ArrowLeft color="#fff" size={35} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Logo />
          </View>
        </View>
        <View style={styles.perfilContent}>
          <Text style={styles.title}>Perfil</Text>
          {perfilData ? (
            <>
              <Text style={styles.title2}>{perfil}</Text>
              <Image source={perfilData.imagem} style={styles.image} />
              <Text style={styles.description}>{perfilData.descricao}</Text>
            </>
          ) : (
            <Text style={styles.processingMessage}>
              O resultado está sendo processado e aparecerá em breve.
            </Text>
          )}
          <TouchableOpacity
            onPress={() => navigationPerfil.navigate("Profile")}
            style={styles.backToProfileButton}
          >
            <Text style={styles.backToProfileText}>Voltar para Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
