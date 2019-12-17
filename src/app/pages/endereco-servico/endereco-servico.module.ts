import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnderecoServicoPage } from './endereco-servico.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoServicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnderecoServicoPage]
})
export class EnderecoServicoPageModule {}
