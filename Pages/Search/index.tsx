import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Searchbar, Snackbar } from "react-native-paper";
import { ListClientsResponse } from "../../@types/apis";
import { useNavigation } from "@react-navigation/native";
import { DetailsClientNavigationProp, ProfileScreenProp } from "../../@types";
import { cpfMask } from "../../lib";
import Fundo from "../../Componentes/imagens/Fundo";
import Logo from "../../Componentes/imagens/Logo";
import {
  mostrarClientes,
  pesquisarClientePorCPF,
} from "../../Services/Client";
import styles from "./styles";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<ListClientsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigationDetailsClient = useNavigation<DetailsClientNavigationProp>();

  const listClients = async () => {
    try {
      setLoading(true);
      const response = await mostrarClientes();
      setClients(response);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listClients();
  }, []);

  const viewClientDetails = (client: ListClientsResponse) => {
    navigationDetailsClient.navigate("DetailsClient", { client });
  };

  const pesquisarClientcpf = async () => {
    try {
      setLoading(true);
      const response = await pesquisarClientePorCPF(searchQuery);

      if (response) {
        viewClientDetails(response);
      } else {
        setError("Cliente não encontrado.");
      }
    } catch (error) {
      setError("Erro ao encontrar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Fundo />
      </View>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Pesquisar Clientes por CPF"
          placeholderTextColor="#fff"
          iconColor="#FFFFFF"
          onChangeText={(text) => setSearchQuery(cpfMask(text))}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchbarInput}
          onIconPress={pesquisarClientcpf}
        />
      </View>
      <View style={styles.clientListContainer}>
        <Text style={styles.title}>Clientes Recomendados</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={clients}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item: client }) => (
              <TouchableOpacity onPress={() => viewClientDetails(client)}>
                <View style={styles.clientCard}>
                  <Text style={styles.clientName}>{client.nome}</Text>
                  <Text style={styles.clientDetails}>{client.cpf}</Text>
                  <Text style={styles.clientDetails}>{client.telefone}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.cpf}
          />
        )}
      </View>
      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </View>
  );
}
