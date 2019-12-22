import { AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'historicoComponent',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit {

  @Input() nome: string;
  @Input() local: string;
  @Input() valor: any;
  @Input() horario: string;

  public qtdStar: number = 0;

  public stars: Array<{ src: string }> = [
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    }
  ]

  constructor(private alertCtrl: AlertController) {

  }

  ngOnInit() {
    if (this.valor) {
      this.valor = Number(this.valor).toFixed(2).replace('.', ',');
    }
    this.horario = this.horario.substr(0, 5);
  }

  public toggleStars(pos: number) {
    for (let i = 0; i < pos; i++) {
      this.stars[i].src = 'assets/starColored.svg';
    }

    for (let i = pos; i < this.stars.length; i++) {
      this.stars[i].src = 'assets/star.svg';
    }
  }

  public showAlert(): void {
    this.alertCtrl.create({
      message: 'Obrigado pela sua avaliação',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Feito',
          handler: () => {

          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
