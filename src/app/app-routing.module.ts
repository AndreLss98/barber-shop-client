import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChatResolveService } from './resolver/chat-resolve.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'login/home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login/cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  {  path: 'login/intro', loadChildren: './pages/modals/intro-modal/intro-modal.module#IntroModalPageModule' },
  { path: 'home/perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'home/cartoes', loadChildren: './pages/cartoes/cartoes.module#CartoesPageModule' },
  { path: 'home/historico', loadChildren: './pages/historico/historico.module#HistoricoPageModule' },
  { path: 'home/agenda', loadChildren: './pages/agenda/agenda.module#AgendaPageModule' },
  { path: 'home/home-chat', loadChildren: './pages/home-chat/home-chat.module#HomeChatPageModule' },
  {
    path: 'home/home-chat/:id',
    resolve: {
      conversas: ChatResolveService
    },
    loadChildren: './pages/chat/chat.module#ChatPageModule'
  },  { path: 'load-atendimento', loadChildren: './pages/load-atendimento/load-atendimento.module#LoadAtendimentoPageModule' },
  { path: 'confirmacao-agenda', loadChildren: './pages/confirmacao-agenda/confirmacao-agenda.module#ConfirmacaoAgendaPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
