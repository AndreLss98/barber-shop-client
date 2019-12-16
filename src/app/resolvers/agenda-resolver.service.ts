import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserService } from '../services/user.service';
import { AgendaService } from '../services/agenda/agenda.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaResolverService implements Resolve<any>{

  constructor(
    private userService: UserService,
    private agendaService: AgendaService,
  ) {

  }
  
  resolve() {
    return this.agendaService.getAgenda(this.userService.user);
  }
}
