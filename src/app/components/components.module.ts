import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoComponent } from './historico/historico.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HistoricoComponent
  ]
})
export class ComponentsModule { }
