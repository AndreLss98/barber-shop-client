import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificaoSolicitacaoPage } from './notificao-solicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: NotificaoSolicitacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificaoSolicitacaoPage]
})
export class NotificaoSolicitacaoPageModule {}
