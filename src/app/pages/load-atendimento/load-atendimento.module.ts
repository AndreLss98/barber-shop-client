import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoadAtendimentoPage } from './load-atendimento.page';

const routes: Routes = [
  {
    path: '',
    component: LoadAtendimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoadAtendimentoPage]
})
export class LoadAtendimentoPageModule {}
