import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-load-atendimento',
  templateUrl: './load-atendimento.page.html',
  styleUrls: ['./load-atendimento.page.scss'],
})
export class LoadAtendimentoPage implements OnInit {

  constructor(
    private route: Router,
    private agendaService: AgendaService
  ) {

  }

  ngOnInit() {
    this.agendaService.sendRequisitionOfService().subscribe((response: any) => {
      if (response.error) {
        console.log(response.error);
        this.route.navigateByUrl('falha-pagamento');
      } else {
        console.log(response);
        this.agendaService.notifyProfissional(response.data.registerService.idservico);
        this.route.navigateByUrl('confirmacao-agenda');
      }
    }, (error: any) => {
      console.log(error);
      this.route.navigateByUrl('falha-pagamento');
    });
  }

}
