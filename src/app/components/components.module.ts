import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat/chat.component';
import { MapItemComponent } from './map-item/map-item.component';
import { HistoricoComponent } from './historico/historico.component';
import { ItemAgendaComponent } from './item-agenda/item-agenda.component';
import { MesAgendaComponent } from './popovers/mes-agenda/mes-agenda.component';

@NgModule({
  declarations: [
    ChatComponent,
    MapItemComponent,
    MesAgendaComponent,
    HistoricoComponent,
    ItemAgendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    ChatComponent,
    MesAgendaComponent,
    HistoricoComponent,
    ItemAgendaComponent
  ]
})
export class ComponentsModule { }
