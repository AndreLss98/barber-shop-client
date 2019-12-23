import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ChatResolverService } from './resolvers/chat-resolver.service';
import { AgendaResolverService } from './resolvers/agenda-resolver.service';
import { HistoricoResolverService } from './resolvers/historico-resolver.service';
import { HistoricoCanceladoResolverService } from './resolvers/historico-cancelado-resolver.service';
import { ConversasResolverService } from './resolvers/conversas-resolver.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  { path: 'login/intro', loadChildren: './pages/modals/intro-modal/intro-modal.module#IntroModalPageModule' },
  { path: 'home/perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'home/cartoes', loadChildren: './pages/cartoes/cartoes.module#CartoesPageModule' },
  {
    path: 'home/historico',
    resolve: {
      historico: HistoricoResolverService,
      cancelado: HistoricoCanceladoResolverService
    },
    loadChildren: './pages/historico/historico.module#HistoricoPageModule'
  },
  {
    path: 'home/agenda',
    resolve: {
      agenda: AgendaResolverService
    },
    loadChildren: './pages/agenda/agenda.module#AgendaPageModule'
  },
  {
    path: 'home/home-chat',
    resolve: {
      chats: ChatResolverService
    },
    loadChildren: './pages/home-chat/home-chat.module#HomeChatPageModule'
  },
  {
    path: 'home/home-chat/:id',
    resolve: {
      conversas: ConversasResolverService
    },
    loadChildren: './pages/chat/chat.module#ChatPageModule'
  },
  { path: 'erro-cadastro', loadChildren: './pages/erro-cadastro/erro-cadastro.module#ErroCadastroPageModule' },
  { path: 'load-atendimento', loadChildren: './pages/load-atendimento/load-atendimento.module#LoadAtendimentoPageModule' },
  { path: 'cadastro-sucesso', loadChildren: './pages/cadastro-sucesso/cadastro-sucesso.module#CadastroSucessoPageModule' },
  { path: 'confirmacao-agenda', loadChildren: './pages/confirmacao-agenda/confirmacao-agenda.module#ConfirmacaoAgendaPageModule' },
  { path: 'falha-pagamento', loadChildren: './pages/falha-pagamento/falha-pagamento.module#FalhaPagamentoPageModule' },
  { path: 'endereco-servico', loadChildren: './pages/endereco-servico/endereco-servico.module#EnderecoServicoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
