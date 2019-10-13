export interface itemDateAgenda {
    day: number;
    month: string;
    year: number;
    items: itemAgenda[]
}
export interface itemAgenda {
    local: string;
    horario: string;
    servico: string;
    valor: number;
    nome: string;
}