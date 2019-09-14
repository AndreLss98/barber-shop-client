import { Injectable } from '@angular/core';
import { itemAgenda } from 'src/app/models/itemAgenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private data: itemAgenda[] = [
    {
      local: "Rua Recife - QD 05 LT 13 - CEP: 745656-089",
      horario: "08:00",
      servico: "Corte de cabelo",
      valor: 30,
      nome: "Dione Moreira"
    },
    {
      local: "Rua Recife - QD 05 LT 13 - CEP: 745656-089",
      horario: "08:00",
      servico: "Corte de cabelo",
      valor: 30,
      nome: "Dione Moreira"
    }
  ]

  constructor() {

  }

  public getAgenda() {
    return this.data;
  }
}
