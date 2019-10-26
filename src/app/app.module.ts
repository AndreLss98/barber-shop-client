import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IntroModalPageModule } from './pages/modals/intro-modal/intro-modal.module';
import { RecuperarSenhaPageModule } from './pages/modals/recuperar-senha/recuperar-senha.module';
import { CadastroCartaoPageModule } from './pages/modals/cadastro-cartao/cadastro-cartao.module';

import { CadastroCartaoPage } from './pages/modals/cadastro-cartao/cadastro-cartao.page';
import { SelecaoServicoPage } from './pages/modals/selecao-servico/selecao-servico.page';
import { ConectionStatusPage } from './pages/modals/conection-status/conection-status.page';
import { NotificaoSolicitacaoPage } from './pages/modals/notificao-solicitacao/notificao-solicitacao.page';
import { NotificacaoSolicitacaoNegadaPage } from './pages/modals/notificacao-solicitacao-negada/notificacao-solicitacao-negada.page';

@NgModule({
  declarations: [AppComponent, SelecaoServicoPage, ConectionStatusPage, NotificaoSolicitacaoPage, NotificacaoSolicitacaoNegadaPage],
  entryComponents: [
    CadastroCartaoPage,
    SelecaoServicoPage,
    ConectionStatusPage,
    NotificaoSolicitacaoPage,
    NotificacaoSolicitacaoNegadaPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IntroModalPageModule,
    IonicModule.forRoot(),
    RecuperarSenhaPageModule,
    CadastroCartaoPageModule
  ],
  providers: [
    Network,
    StatusBar,
    Geolocation,
    SplashScreen,
    LocationAccuracy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
