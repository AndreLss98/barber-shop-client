import { Injectable } from '@angular/core';

import { NOME_DIAS_SEMANAS } from './../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  readonly NOME_DIAS_SEMANAS = NOME_DIAS_SEMANAS;

  constructor() {

  }

  public diasMesAtual(mes: number, ano: number) {
    let tempMes: any[] = [];
    let tamanhoDoMes = this.getTotaldeDias(mes, ano);
    let tamanhoDoMesAnterior = this.getTotaldeDias((mes - 1), ano);

    for (let j = this.diaInicial(ano, mes); j > 0; j--) {
      tempMes.push( {numero: (tamanhoDoMesAnterior + 1) - j, isCurrentMonth: false});
    }

    for (let i = 1; i <= tamanhoDoMes; i++) {
      tempMes.push({ numero: i, isCurrentMonth: true });
    }
    return tempMes;
  }

  public diasRestanteDoMesAtual(date: Date) {
    let tempMes: any[] = [];
    let tamanhoDoMes = this.getTotaldeDias(date.getMonth(), date.getFullYear());

    let numeroDiaSemana = date.getDay();
    for (let i = date.getDate(); i <= tamanhoDoMes; i++, numeroDiaSemana++) {
      if (numeroDiaSemana === 7) numeroDiaSemana = 0;
      tempMes.push({ numero: i,  nomeDiaSemana: NOME_DIAS_SEMANAS[numeroDiaSemana], hasService: false});
    }
    return tempMes;
  }

  private getTotaldeDias(month: number, ano: number) {
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
      return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    } else {
      return this.isAnoBisexto(ano) ? 29 : 28;
    }
  }
  
  private isAnoBisexto(ano: number) {
    return ((ano % 100 !== 0) && (ano % 4 === 0) || (ano % 400 === 0));
  }

  private diaInicial(ano: number, mes: number) {
    let inicio = new Date(ano, mes, 1).getDay();
    return inicio;
  }
}
