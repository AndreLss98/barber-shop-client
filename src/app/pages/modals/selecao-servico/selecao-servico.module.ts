import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelecaoServicoPage } from './selecao-servico.page';

const routes: Routes = [
  {
    path: '',
    component: SelecaoServicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelecaoServicoPage]
})
export class SelecaoServicoPageModule {}
