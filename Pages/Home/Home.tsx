import React from "react";
import { View, Text, ScrollView } from "react-native";
import Carrossel from "../../Componentes/Carrossel";
import Logo from "../../Componentes/imagens/Logo";
import Grafic1 from "../../Componentes/imagens/grafic1";
import Grafic2 from "../../Componentes/imagens/Grafic2";
import { useAuth } from "../../Context/AuthContext";
import { styles } from "./styles";
import SalesGoal from "../../Componentes/Grafic/pessoal";
import DashboardGlobal from "../../Componentes/Grafic/empresa";

export default function Home() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Bem-vindo, {user?.name || "Usuário"}! 👋🏼
        </Text>
      </View>

      <Carrossel />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      {user && <SalesGoal user={user} salesGoal={100} />}
    </View>
{/* 
      <View style={styles.graficPadding}>
      <DashboardGlobal />
      </View> */}
    </ScrollView>
  );
}
