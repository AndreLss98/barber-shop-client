import { profissional } from './profissional.model';

export interface conversa {
    idcliente: number;
    idprofissional: number;
    iscliente: boolean;
    texto: string;
}

export interface chat {
    profissional: profissional;
    conversas: conversa[];
}