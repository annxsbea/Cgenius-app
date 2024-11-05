import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DetailsClientRouteProp, RootStackParamList } from "../../@types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ArrowLeft, CheckCircle, Info, XCircle, DollarSign } from "lucide-react-native";
import Logo from "../../Componentes/imagens/Logo";
import { styles } from "./styles";
import { useAuth } from "../../Context/AuthContext";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { updateClientStatus } from "../../Services/Client";
import { Button, Modal, Portal, Provider, RadioButton } from "react-native-paper";
import { scheduleNotification } from "../../lib/notification";

type Props = {
  route: DetailsClientRouteProp;
};


export default function DetailsClient({ route }: Props) {
  const { client } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [statusVenda, setStatusVenda] = useState(client.statusVenda || "Aberto");

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(client.statusVenda || "Aberto");
  const [clientState, setClientState] = useState(client);
  const [selectedScript, setSelectedScript] = useState("");
  const [modalVisibleScript, setModalVisibleScript] = useState(false);

  const openScriptModal  = (scriptDescricao) => {
    setSelectedScript(scriptDescricao);
    setModalVisibleScript(true);
  };
  const handleVendaRealizada = async () => {
    if (!user) return;
  
    setLoading(true);
    try {
      const userRef = doc(database, "usuarios", user.uid);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const { qtdVendas } = userDoc.data();
        const novaQtdVendas = (qtdVendas || 0) + 1;
  
        await updateDoc(userRef, {
          qtdVendas: novaQtdVendas,
        });
  
        await updateClientStatus(client.id, selectedStatus);

          setClientState((prevClient) => ({
          ...prevClient,
          statusVenda: selectedStatus, 
        }));
  
        if (selectedStatus === "Vendido") {
          await scheduleNotification("Venda concluída", "Parabéns, sua venda foi concluída com sucesso!");
        }
  
        alert("Status de venda atualizado com sucesso!");
      } else {
        alert("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao atualizar vendas: ", error);
      alert("Não foi possível registrar a venda.");
    } finally {
      setLoading(false);
      setStatusModalVisible(false);
    }
  };
  

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="#fff" size={35} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Logo />
          </View>
        </View>

        <View style={styles.clientInfoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={styles.clientDetailText}>Cliente:</Text>
              <Text style={styles.clientName}>{client.nome}</Text>
            </View>
            <View>
              <Text style={styles.clientDetailText}>Estado de Venda:</Text>
              <StatusIndicator status={clientState.statusVenda ?? "Não disponível"} />
              </View>
          </View>

          <Text style={styles.clientProfile}>Perfil do cliente</Text>

          <View style={styles.profileBadge}>
            <Text style={styles.profileText}>{client.perfilCliente}</Text>
          </View>

          <View style={styles.clientDetailCard}>


            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={styles.clientDetailText}>CPF</Text>
              <Text style={styles.clientDetailValue}>{client.cpf}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={styles.clientDetailText}>Telefone</Text>
              <Text style={styles.clientDetailValue}>{client.telefone}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={styles.clientDetailText}>E-mail</Text>
              <Text style={styles.clientDetailValue}>{client.email}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={styles.clientDetailText}>DT Nascimento</Text>
              <Text style={styles.clientDetailValue}>{client.dtNascimento}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={styles.clientDetailText}>Localização</Text>
              <Text style={styles.clientDetailValue}>{client.cep}</Text>
            </View>
          </View>


          <View style={styles.especificacoesCard}>
            <Text style={styles.especificacoesTitle}>Especificações</Text>
            {client.especificacoes.length > 0 ? (
              client.especificacoes.map((especificacao, index) => (
                <View key={index} style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Tipo de Cartão de Crédito:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.tipoCartaoCredito ?? "Não disponível"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Gasto Mensal:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.gastoMensal ?? "Não disponível"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Renda Mensal:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.rendaMensal ?? "Não disponível"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Viaja Frequentemente:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.viajaFrequentemente !== null
                        ? especificacao.viajaFrequentemente === 1
                          ? "Sim"
                          : "Não"
                        : "Não disponível"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Interesses:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.interesses ?? "Não disponível"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Profissão:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.profissao ?? "Não disponível"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.clientDetailText}>Dependentes:</Text>
                    <Text style={styles.clientDetailValue}>
                      {especificacao.dependentes ?? "Não disponível"}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>Sem especificações disponíveis.</Text>
            )}
          </View>
        </View>

     
        <View style={styles.scriptContainer}>
          {client.scripts.length > 0 ? (
            client.scripts.map((script, index) => (
              <View key={index} style={{ marginTop: 10 , alignItems: "center" }}>
                <TouchableOpacity onPress={() => openScriptModal(script.descricao)} style={styles.scriptCard}>
                <Text style={styles.scriptTitle}>Script Gerado</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>Sem scripts disponíveis.</Text>
          )}
        </View>
       <Portal>
          <Modal
            visible={modalVisibleScript}
            onDismiss={() => setModalVisibleScript(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Conteúdo do Script</Text>
            <Text>{selectedScript}</Text>
            <Button onPress={() => setModalVisibleScript(false)}>Fechar</Button>
          </Modal>
        </Portal>



        <Portal>
          <Modal
            visible={statusModalVisible}
            onDismiss={() => setStatusModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Selecione o Status</Text>
            <RadioButton.Group
              onValueChange={newValue => setSelectedStatus(newValue)}
              value={selectedStatus}
            >
              <RadioButton.Item label="Aberto" value="Aberto" />
              <RadioButton.Item label="Negado" value="Negado" />
              <RadioButton.Item label="Venda Realizada" value="Venda Realizada" />
            </RadioButton.Group>
            <Button
              mode="contained"
              onPress={() => {
                handleVendaRealizada();
                setStatusModalVisible(false); 
              }}
              loading={loading}
              disabled={loading}
              style={styles.updateButton}
            >
              Atualizar Status
            </Button>
          </Modal>
        </Portal>
      </ScrollView>
        <TouchableOpacity
          onPress={() => setStatusModalVisible(true)}
          style={styles.floatingButton}
          disabled={loading}
        >
          <CheckCircle color="#fff" size={20} />
          <Text style={styles.vendaButtonText}>
            {loading ? "Processando..." : " Status"}
          </Text>
        </TouchableOpacity>
    </Provider>
  );
}

const StatusIndicator = ({ status }) => {
  let color;
  let icon;

  switch (status) {
    case "Aberto":
      color = "gray";
      icon = <Info color={color} />;
      break;
    case "Negado":
      color = "red";
      icon = <XCircle color={color} />;
      break;
    case "Venda Realizada":
      color = "green";
      icon = <CheckCircle color={color} />;
      break;
    default:
      color = "gray"; 
      icon = null;
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {icon}
      <Text style={{ color, marginLeft: 5 }}>{status}</Text>
    </View>
  );
};

