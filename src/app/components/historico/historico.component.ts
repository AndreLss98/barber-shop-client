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

  constructor() {
    
  }

  ngOnInit() {
    if (this.valor) {
      this.valor = Number(this.valor).toFixed(2).replace('.', ',');
    }
  }

}
