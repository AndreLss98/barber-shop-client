interface telefone {
    ddd: number,
    numero: string
}
export interface Client {
    idcliente: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    senha: string;
    latitude: number;
    longitude: number;
    telefones: telefone[]
}