import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { servico } from 'src/app/models/servico.model';

import { UserService } from 'src/app/services/user.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-endereco-servico',
  templateUrl: './endereco-servico.page.html',
  styleUrls: ['./endereco-servico.page.scss'],
})
export class EnderecoServicoPage implements OnInit {

  public numero: number;
  public endereco: string = '';
  public complemento: string;
  public pto_referencia: string;

  constructor(
    private route: Router,
    public userService: UserService,
    private agendaService: AgendaService
  ) {

  }

  ngOnInit() {
    this.endereco = this.userService.user.endereco;
  }

  public closePage() {
    this.route.navigateByUrl('login/home');
    this.agendaService.newService = new Object() as servico;
  }

  public confirmarEndereco() {
    this.agendaService.newService.endereco.endereco = this.endereco;
    this.agendaService.newService.endereco.complemento = this.complemento;
    if (this.numero) {
      this.agendaService.newService.endereco.numero = this.numero;
    }
    this.agendaService.newService.endereco.pto_referencia = this.pto_referencia;
    this.route.navigateByUrl('load-atendimento');
  }

}
