import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
import { ListClientsResponse } from "../@types";
import { ListEspecificacaoResponse } from "../@types/apis/especificacao";
import { cpfValidator } from "../lib";

export async function criarCliente(
  cliente: Omit<ListClientsResponse, "id" | "especificacoes" | "scripts">
): Promise<string> {
  try {
    const clienteRef = await addDoc(collection(database, "clientes"), cliente);
    return clienteRef.id;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
}
export async function adicionarEspecificacao(
  idCliente: string,
  especificacao: ListEspecificacaoResponse
) {
  try {
    await addDoc(
      collection(database, "clientes", idCliente, "especificacoes"),
      especificacao
    );
  } catch (error) {
    console.error("Erro ao adicionar especificação:", error);
    throw error;
  }
}
export async function updateClientStatus(clientId: string, statusVenda: string) {
    try {
      const clientRef = doc(database, "clientes", clientId);
      await updateDoc(clientRef, {
        statusVenda: statusVenda
      });
    } catch (error) {
      console.error("Erro ao atualizar status do cliente:", error);
      throw new Error("Erro ao atualizar status do cliente: " , error.message);
    }
  }



export async function adicionarScript(idCliente: string, script: any) {
  try {
    await addDoc(
      collection(database, "clientes", idCliente, "scripts"),
      script
    );
  } catch (error) {
    console.error("Erro ao adicionar script:", error);
    throw error;
  }
}
export async function mostrarClientes(): Promise<ListClientsResponse[]> {
  try {
    const clientesSnapshot = await getDocs(collection(database, "clientes"));
    const clientes: ListClientsResponse[] = [];

    for (const clienteDoc of clientesSnapshot.docs) {
      const clienteData = clienteDoc.data() as Omit<
        ListClientsResponse,
        "id" | "especificacoes" | "scripts"
      >;
      const idCliente = clienteDoc.id;

      const especificacoesSnapshot = await getDocs(
        collection(doc(database, "clientes", idCliente), "especificacoes")
      );
      const especificacoes = especificacoesSnapshot.docs.map(
        (doc) => doc.data() as ListEspecificacaoResponse
      );

      const scriptsSnapshot = await getDocs(
        collection(doc(database, "clientes", idCliente), "scripts")
      );
      const scripts = scriptsSnapshot.docs.map((doc) => doc.data());

      clientes.push({
        id: idCliente,
        ...clienteData,
        especificacoes,
        scripts,
      });
    }

    return clientes;
  } catch (error) {
    console.error("Erro ao mostrar clientes:", error);
    throw error;
  }
}
export async function pesquisarClientePorCPF(
  cpf: string
): Promise<ListClientsResponse | null> {
  try {
    const cpfFormatado = cpf.replace(/\D/g, "");
    if (!cpfValidator(cpfFormatado)) {
      throw new Error("CPF inválido");
    }
    const clientesRef = collection(database, "clientes");
    const q = query(clientesRef, where("cpf", "==", cpfFormatado));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Cliente não encontrado.");
      return null;
    }

    const clienteDoc = querySnapshot.docs[0];
    const idCliente = clienteDoc.id;
    const clienteData = clienteDoc.data() as Omit<
      ListClientsResponse,
      "id" | "especificacoes" | "scripts"
    >;

    console.log("Cliente encontrado: ", clienteData);

    if (!clienteData) {
      console.error("Dados do cliente não encontrados.");
      return null;
    }

    const [especificacoesSnapshot, scriptsSnapshot] = await Promise.all([
      getDocs(collection(database, "clientes", idCliente, "especificacoes")),
      getDocs(collection(database, "clientes", idCliente, "scripts")),
    ]);

    const especificacoes = especificacoesSnapshot.docs.map(
      (doc) => doc.data() as ListEspecificacaoResponse
    );
    const scripts = scriptsSnapshot.docs.map((doc) => doc.data());

    return {
      id: idCliente,
      ...clienteData,
      especificacoes,
      scripts,
    };
  } catch (error) {
    console.error("Erro ao pesquisar cliente por CPF:", error);
    throw new Error(
      "Erro ao pesquisar cliente por CPF. Verifique o CPF e tente novamente."
    );
  }
}
