import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../Componentes/imagens/Logo";
import { Button, Card, Dialog, Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SignInScreenProp, TestePersonScreenProp } from "../../@types";
import { useAuth } from "../../Context/AuthContext";
import styles from "./styles";
import Person from "../../Componentes/imagens/Person";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const ProfileScreen: React.FC = () => {
  const navigationTestePerson = useNavigation<TestePersonScreenProp>();
  const { user, signOut, updateProfilePicture } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleNavigateToTestePerson = () => {
    if (user?.perfil) {
      navigationTestePerson.navigate("ResultadoPerfil", {
        perfil: user.perfil,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        navigationTestePerson.navigate("TestePerson");
        setLoading(false);
      }, 500);
    }
  };

  const pickImage = async (source: "gallery" | "camera") => {
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Você precisa permitir o acesso à galeria!");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      updateProfilePicture(result.assets[0].uri);
      setSuccessMessage("Imagem de perfil atualizada com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
    setVisibleDialog(false);
  };

  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={showDialog} style={styles.personIconContainer}>
          {user?.profilePictureUrl ? (
            <Image
              source={{ uri: user.profilePictureUrl }}
              style={styles.profileImage}
            />
          ) : (
            <Person />
          )}
          <View style={styles.editIconContainer}>
            <FontAwesome5 name="pen" size={15} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.cpfText}>CPF:{user?.cpf}</Text>
          <Text style={styles.setorText}>{user?.setor}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (user?.perfil) {
            navigationTestePerson.navigate("ResultadoPerfil", {
              perfil: user.perfil,
            });
          } else {
            alert("Perfil não disponível! Faça o teste.");
          }
        }}
        style={styles.personalitiesContainer}
      >
        <Text style={styles.sectionTitle}>Personalidades</Text>
        <Card style={styles.card}>
          <Text style={styles.cardText}>
            {user?.perfil || "Não disponível! Faça o teste"}
          </Text>
        </Card>
      </TouchableOpacity>
      <View style={styles.testsContainer}>
        <Text style={styles.sectionTitle}>Testes</Text>
        <TouchableOpacity
          onPress={handleNavigateToTestePerson}
          style={styles.testButton}
        >
          <View style={styles.testButtonContent}>
            <Ionicons name="person" color={"#A99EDE"} size={30} />
            <Text style={styles.testButtonText}>Personalidade</Text>
          </View>
          <Text style={styles.testButtonDescription}>
            {user?.perfil
              ? "Você já fez o teste! Veja seu perfil"
              : "Faça o Teste e descubra qual o seu perfil de Vendedor!!"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {successMessage ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>Selecionar Imagem</Dialog.Title>
          <Dialog.Content>
            <Text>Escolha uma opção para adicionar sua imagem de perfil:</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => pickImage("camera")}>Câmera</Button>
            <Button onPress={() => pickImage("gallery")}>Galeria</Button>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default ProfileScreen;
