import { profissional } from './profissional.model';

export interface endereco {
    endereco: string;
    numero: number;
    complemento: string;
    pto_referencia: string;
}
export interface tipoServico {
    id: number;
    nome: string;
}
export interface servico {
    idservico: number;
    idcartao: number;
    idprofissional: number;
    nota: number;
    dia: number;
    mes: string;
    ano: number;
    horario: string;
    aceito: boolean;
    concluido: boolean;
    cancelado: boolean;
    valortotal: number;
    endereco: endereco;
    servicos: tipoServico[];
    profissional: profissional;
}