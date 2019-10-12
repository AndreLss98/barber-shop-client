import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroSucessoPage } from './cadastro-sucesso.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroSucessoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroSucessoPage]
})
export class CadastroSucessoPageModule {}
