import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { NOME_MESES } from './../../../constants/constants';

@Component({
  selector: 'app-mes-agenda',
  templateUrl: './mes-agenda.component.html',
  styleUrls: ['./mes-agenda.component.scss'],
})
export class MesAgendaComponent implements OnInit {

  readonly NOME_MESES = NOME_MESES;

  constructor(
    private popoverCtrl: PopoverController
  ) { 

  }

  ngOnInit() {

  }

  public closePopover(pos: number) {
    this.popoverCtrl.dismiss(pos);
  }

}
