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

  constructor() { }

  ngOnInit() {}

}
