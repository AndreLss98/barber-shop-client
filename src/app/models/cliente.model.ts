export interface telefone {
    ddd: number,
    numero: string
}

export interface Client {
    idcliente: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefones: telefone[];
    senha: string;
    latitude: number;
    longitude: number;
}