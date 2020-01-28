import { profissional } from './profissional.model';

export interface conversa {
    idcliente: number;
    idprofissional: number;
    iscliente: boolean;
    texto: string;
    dthorario?: string;
}

export interface chat {
    profissional: profissional;
    conversas: conversa[];
}