import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { ProfissionaisService } from '../services/profissionais/profissionais.service';

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisResolverService implements Resolve<any> {

  constructor(
    private profissionaisService: ProfissionaisService
  ) {

  }

  resolve() {
    return this.profissionaisService.getAll();
  }
}
