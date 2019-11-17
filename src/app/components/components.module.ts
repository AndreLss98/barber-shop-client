import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { HistoricoComponent } from './historico/historico.component';
import { ItemAgendaComponent } from './item-agenda/item-agenda.component';
import { ChatComponent } from './chat/chat.component';
import { MesAgendaComponent } from './popovers/mes-agenda/mes-agenda.component';
import { MapItemComponent } from './map-item/map-item.component';

@NgModule({
  declarations: [
    ChatComponent,
    MapItemComponent,
    MesAgendaComponent,
    HistoricoComponent,
    ItemAgendaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HistoricoComponent,
    ItemAgendaComponent,
    ChatComponent,
    MesAgendaComponent
  ]
})
export class ComponentsModule { }
