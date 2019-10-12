import { Component, OnInit } from '@angular/core';

import { HistoricoService } from 'src/app/services/historico/historico.service';
import { Historico } from 'src/app/models/historico.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public abaSelecionada: string = 'realizado';
  public historicoRealizados: Historico[] = [];
  public historicoCancelados: Historico[] = [];

  constructor(
    private historicoService: HistoricoService
  ) {

  }

  ngOnInit() {
    this.historicoRealizados = this.historicoService.getHistorico();
    /* this.historicoService.getHistoricoCancelado().subscribe((data) => {
      this.historicoCancelados = data;
    }); */
  }

}
