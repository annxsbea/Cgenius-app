import React, { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ResultadoPerfilScreen } from "../../@types";
import { useAuth } from "../../Context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { styles } from "./styles"; // Importe os estilos

export default function TestePerson() {
  const [comunicacao, setComunicacao] = useState("1");
  const [avaliacaoProduto, setAvaliacaoProduto] = useState("1");
  const [empatia, setEmpatia] = useState("1");
  const [produtosComplexos, setProdutosComplexos] = useState("Sim");
  const [trabalhoEquipe, setTrabalhoEquipe] = useState("1");
  const [perfil, setPerfil] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigationResultado = useNavigation<ResultadoPerfilScreen>();
  const { user } = useAuth();

  const calcularPerfil = async () => {
    let perfil = "Expressivo";

    if (comunicacao === "5" && empatia === "5") {
      perfil = "Diplomático";
    } else if (comunicacao === "1" && empatia === "1") {
      perfil = "Pragmático";
    }

    if (user) {
      try {
        const userRef = doc(database, "usuarios", user.uid);
        await updateDoc(userRef, { perfil });
        console.log("Perfil atualizado no Firestore:", perfil);

        navigationResultado.navigate("ResultadoPerfil", { perfil });
      } catch (error) {
        setError("Erro ao atualizar o perfil, tente novamente.");
      }
    } else {
      setError("Usuário não autenticado.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Teste de Personalidade</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>1</Text>
          <Text style={styles.questionText}>
            Como você avaliaria suas habilidades de comunicação em uma escala de
            1 a 5?
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={(value) => setComunicacao(value)}
          value={comunicacao}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <View key={num} style={styles.radioGroupContainer}>
              <RadioButton value={String(num)} />
              <Text style={styles.radioText}>{num}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Pergunta 2 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>2</Text>
          <Text style={styles.questionText}>
            Como você classificaria sua capacidade de avaliar o conhecimento do
            produto que o cliente possui?
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={(value) => setAvaliacaoProduto(value)}
          value={avaliacaoProduto}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <View key={num} style={styles.radioGroupContainer}>
              <RadioButton value={String(num)} />
              <Text style={styles.radioText}>{num}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Pergunta 3 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>3</Text>
          <Text style={styles.questionText}>
            Como você avaliaria seu nível de empatia ao lidar com clientes em
            uma escala de 1 a 5?
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={(value) => setEmpatia(value)}
          value={empatia}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <View key={num} style={styles.radioGroupContainer}>
              <RadioButton value={String(num)} />
              <Text style={styles.radioText}>{num}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Pergunta 4 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>4</Text>
          <Text style={styles.questionText}>
            Você se sente confortável lidando com produtos complexos?
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={(value) => setProdutosComplexos(value)}
          value={produtosComplexos}
        >
          {["Sim", "Não"].map((opcao) => (
            <View key={opcao} style={styles.radioGroupContainer}>
              <RadioButton value={opcao} />
              <Text style={styles.radioText}>{opcao}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Pergunta 5 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>5</Text>
          <Text style={styles.questionText}>
            Como você classificaria suas habilidades de trabalho em equipe em
            uma escala de 1 a 5?
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={(value) => setTrabalhoEquipe(value)}
          value={trabalhoEquipe}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <View key={num} style={styles.radioGroupContainer}>
              <RadioButton value={String(num)} />
              <Text style={styles.radioText}>{num}</Text>
            </View>
          ))}
        </RadioButton.Group>

        <Pressable onPress={calcularPerfil} style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
