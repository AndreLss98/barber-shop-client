export interface telefone {
    ddd: number,
    numero: string
}
export interface cartao {
    idcartao: number;
    numero: string;
    nome: string;
    cvv: number;
    datavalidade: string;
    category: string;
}
export interface Client {
    idcliente: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefones: telefone[];
    latitude: number;
    longitude: number;
    cartoes: cartao[];
    endereco: string;
    imgperfil: string;
}