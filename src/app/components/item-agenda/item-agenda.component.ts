import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

import { tipoServico } from 'src/app/models/servico.model';
import { profissional } from 'src/app/models/profissional.model';

@Component({
  selector: 'item-agenda',
  templateUrl: './item-agenda.component.html',
  styleUrls: ['./item-agenda.component.scss'],
})
export class ItemAgendaComponent implements OnInit {

  @Input() local: string;
  @Input() horario: string;
  @Input() servicos: tipoServico[];
  @Input() valor: string;
  @Input() profissional: profissional;

  public isInverted: boolean = false;

  constructor(private actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit() {
    this.horario = this.horario.substr(0, 5);
    this.valor = Number(this.valor).toFixed(2).replace('.', ',');
  }

  public cancelService() {
    this.actionSheetCtrl.create({
      header: 'Deseja realmente cancelar o agendamento? Será cobrado uma taxa de cancelamento em seu cartão!',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          role: 'destructive'
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],
      mode: 'ios'
    }).then((action) => {
      action.present();
    });
  }
}
