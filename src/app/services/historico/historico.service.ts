import { Injectable } from '@angular/core';
import { Historico } from 'src/app/models/historico.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private data: Historico[] = [
    {
      dia: 'TER 28 JUL 2019',
      data: [
        {
          barberName: 'Jean Cleber',
          local: 'Rua Recife QD 05 lt 13',
          horas: '08:00',
          valor: 30.0,
        },
        {
          barberName: 'Jean Cleber',
          local: 'Rua Recife QD 05 lt 13',
          horas: '10:00',
          valor: 35.0,
        }
      ]
    },
    {
      dia: 'SEG 28 AGO 2019',
      data: [
        {
          barberName: 'Victor Luiz',
          local: 'Rua São Paulo',
          horas: '10:30',
          valor: 30.0,
        }
      ]
    }
  ];

  private dataCancelados: Historico[] = [
    {
      dia: 'TER 26 JUL 2019',
      data: [
        {
          barberName: 'Jean Cleber',
          local: 'Rua Recife QD 05 lt 13',
          horas: '',
          valor: null,
        }
      ]
    }
  ];


  constructor() {

  }

  public getHistorico(): Historico[] {
    return this.data;
  }

  public getHistoricoCancelado(): Observable<Historico[]> {
    return of(this.dataCancelados);
  }

}
