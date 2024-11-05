import { DocumentData } from "firebase/firestore";

export interface    ListClientsResponse {
    id: string;
    nome: string;
    cpf: string;
    dtNascimento: string;
    genero: string;
    cep: string;
    telefone: string;
    email: string;
    perfilCliente: string;
    statusVenda: string;
    especificacoes: DocumentData[];
    scripts: DocumentData[];
}
