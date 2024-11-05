import React, { useState } from "react";
import {
  Card,
  TextInput,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { Pressable, View, Text, ScrollView, Alert, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import Logo from "../../Componentes/imagens/Logo";
import Fundo from "../../Componentes/imagens/Fundo";
import { useAuth } from "../../Context/AuthContext";
import { SignInScreenProp } from "../../@types";
import * as Notifications from "expo-notifications"; 

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user} = useAuth();
  const navigation = useNavigation<SignInScreenProp>();

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Você precisa permitir notificações para receber mensagens.'
        );
        return false; 
      }
    }
    return true; 
  };
  const logar = async () => {
    if (!email || !senha) {
      setError("Por favor, insira o email e a senha.");
      return;
    }

    try {
      setLoading(true);
      const hasPermission = await requestNotificationPermission(); 

      if (hasPermission) {
        await signIn(email, senha);
      }
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Fundo />
      </View>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.overlay} />
          <Text style={styles.cardTitle}>Login</Text>
          <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>

          <Card.Content style={styles.cardContent}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder=""
              style={styles.textInput}
              placeholderTextColor="#ffffff"
              textColor="#fff"
              mode="outlined"
              outlineColor="#54476b"
            />
            <TextInput
              label="Senha"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry={true}
              style={styles.textInput}
              textColor="#fff"
              mode="outlined"
              outlineColor="#54476b"
            />
          </Card.Content>
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={["#8740CD", "#4b05ad"]}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.gradientButton1}
            >
              <Pressable onPress={logar}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </LinearGradient>
          </View>


          <Text style={styles.signUpText}>
            Não tem conta?{" "}
            <Text onPress={handleSignUp} style={styles.signUpLink}>
              Criar
            </Text>
          </Text>
        </ScrollView>
        <Snackbar
          visible={!!error}
          onDismiss={() => setError("")}
          duration={3000}
          style={styles.snackbar}
        >
          {error}
        </Snackbar>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
