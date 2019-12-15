<<<<<<< HEAD
export interface telefone {
    ddd: number,
    numero: string
}

=======
interface telefone {
    ddd: number,
    numero: string
}
>>>>>>> cdb4c2f60a0e8d8d89ff799c2a00c5e96227bafb
export interface Client {
    idcliente: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefones: telefone[];
    senha: string;
    latitude: number;
    longitude: number;
    telefones: telefone[]
}