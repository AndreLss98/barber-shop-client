import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mes-agenda',
  templateUrl: './mes-agenda.component.html',
  styleUrls: ['./mes-agenda.component.scss'],
})
export class MesAgendaComponent implements OnInit {

  public moths: any;

  constructor(
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.moths = this.agendaService.getMoths();
  }

  public closePopover(pos: number) {
    this.popoverCtrl.dismiss(pos);
  }

}
