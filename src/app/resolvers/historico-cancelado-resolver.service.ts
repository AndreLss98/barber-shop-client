import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service';
import { HistoricoService } from '../services/historico/historico.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoCanceladoResolverService implements Resolve<any> {

  constructor(
    private userService: UserService,
    private historicoService: HistoricoService
  ) {

  }

  resolve() {
    return this.historicoService.getHistoricoCancelado(this.userService.user);
  }
}
