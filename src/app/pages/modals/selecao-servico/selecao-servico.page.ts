import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selecao-servico',
  templateUrl: './selecao-servico.page.html',
  styleUrls: ['./selecao-servico.page.scss'],
})
export class SelecaoServicoPage implements OnInit {

  public slidesConfig = {
    slidesPerView: 4
  }
  public currentMoth;
  public moth = [];

  public horarios = [ '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ];

  constructor(private agendaService: AgendaService, private modaCtrl: ModalController) {
    this.currentMoth = agendaService.getMonthName(this.agendaService.getMonth());
    this.moth = agendaService.constructMonth(this.agendaService.getDate());
  }

  ngOnInit() {

  }

  public closeModal() {
    this.modaCtrl.dismiss();
  }

}
