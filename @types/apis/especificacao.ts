import { ListClientsResponse } from "./listClients";

export interface ListEspecificacaoResponse {
    length: number;
    id: number;
    tipoCartaoCredito: string;
    gastoMensal: string; 
    rendaMensal: string; 
    viajaFrequentemente: number | null; 
    interesses: string;
    profissao: string;
    dependentes: number | null; 
    cliente: ListClientsResponse | null; 
  }