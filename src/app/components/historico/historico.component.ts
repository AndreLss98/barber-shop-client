import { AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { HistoricoService } from 'src/app/services/historico/historico.service';

import { BASE_URL } from '../../../environments/environment';

@Component({
  selector: 'historicoComponent',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit {

  readonly BASE_URL = BASE_URL;

  @Input() idservico: number;
  @Input() nome: string;
  @Input() local: string;
  @Input() valor: any;
  @Input() horario: string;
  @Input() qtdStar: number = 0;
  @Input() imgPerfil: string;

  public isRated = false;

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

  constructor(
    private alertCtrl: AlertController,
    private historicoService: HistoricoService
  ) {

  }

  ngOnInit() {
    if (this.valor) {
      this.valor = Number(this.valor).toFixed(2).replace('.', ',');
    }
    this.horario = this.horario.substr(0, 5);
    if (this.qtdStar !== null && this.qtdStar !== undefined) {
      this.toggleStars(this.qtdStar);
      this.isRated = true;
    } else {
      this.qtdStar = 0;
    }
  }

  public toggleStars(pos: number) {
    if (!this.isRated) {
      this.qtdStar = pos;
      for (let i = 0; i < pos; i++) {
        this.stars[i].src = 'assets/starColored.svg';
      }
  
      for (let i = pos; i < this.stars.length; i++) {
        this.stars[i].src = 'assets/star.svg';
      }
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

  public sendRate() {
    this.historicoService.rateServie(this.idservico, this.qtdStar).subscribe((response: any) => {
      if (response.error) {
        console.error(response.error);
      } else {
        this.isRated = true;
        this.showAlert();
      }
    });
  }

}
