import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroCartaoPage } from './cadastro-cartao.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroCartaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [CadastroCartaoPage],
  exports: [ CadastroCartaoPage ]
})
export class CadastroCartaoPageModule {}
