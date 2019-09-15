import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'item-agenda',
  templateUrl: './item-agenda.component.html',
  styleUrls: ['./item-agenda.component.scss'],
})
export class ItemAgendaComponent implements OnInit {

  @Input() local: string;
  @Input() horario: string;
  @Input() servico: string;
  @Input() valor: string;
  @Input() nome: string;

  public isInverted: boolean = false;

  constructor() { }

  ngOnInit() { 
    this.valor = Number(this.valor).toFixed(2).replace('.', ',');
  }



}
