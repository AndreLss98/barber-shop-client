import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutosizeModule } from 'ngx-autosize';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AutosizeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
