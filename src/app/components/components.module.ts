import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { HistoricoComponent } from './historico/historico.component';
import { ItemAgendaComponent } from './item-agenda/item-agenda.component';

@NgModule({
  declarations: [
    HistoricoComponent,
    ItemAgendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HistoricoComponent,
    ItemAgendaComponent
  ]
})
export class ComponentsModule { }
