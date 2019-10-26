import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FalhaPagamentoPage } from './falha-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: FalhaPagamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FalhaPagamentoPage]
})
export class FalhaPagamentoPageModule {}
