export type ILoginPayload = {
    cpf_atendente: string,
    senha: string,
  }
  
  export type SignUpFormInterface = {
    nome_atendente: string;
    cpf_atendente : string;
    setor: string;
    senha: string;
  }

  export type SignInResponse = any;
  export type SignUpResponse = any;