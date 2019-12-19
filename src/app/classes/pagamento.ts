import { OnInit } from '@angular/core';

import { NOME_MESES } from './../constants/constants';

import { AgendaService } from '../services/agenda/agenda.service';
export class Pagamento implements OnInit {

    readonly NOME_MESES = NOME_MESES;
    private dataAtual: Date = new Date();
    public diaAtual: number;
    public anoAtual: number;
    private numeroMesAtual: number;
    public nomeMesAtual: string = '';

    public valor: string;

    constructor(private agendaService: AgendaService) {

    }

    ngOnInit() {
        this.valor = Number(this.agendaService.newService.valortotal).toFixed(2).replace('.', ',');
        this.diaAtual = this.dataAtual.getDate();
        this.anoAtual = this.dataAtual.getFullYear();
        this.numeroMesAtual = this.dataAtual.getMonth();
        this.nomeMesAtual = NOME_MESES[this.numeroMesAtual];
    }
}