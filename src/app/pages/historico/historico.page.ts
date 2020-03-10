import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { servico } from 'src/app/models/servico.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public abaSelecionada: string = 'realizado';
  public historicoRealizados: servico[] = [];
  public historicoCancelados: servico[] = [];

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data.historico) {
      this.historicoRealizados = this.route.snapshot.data.historico.data.clienteServices;
    }
    if (this.route.snapshot.data.cancelado) {
      this.historicoCancelados = this.route.snapshot.data.cancelado.data.clientCanceledService;
    }
  }

}
