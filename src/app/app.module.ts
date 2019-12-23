import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { AppComponent } from './app.component';
import { CustomMenuComponent } from './pages/modals/custom-menu/custom-menu.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { IntroModalPageModule } from './pages/modals/intro-modal/intro-modal.module';
import { RecuperarSenhaPageModule } from './pages/modals/recuperar-senha/recuperar-senha.module';
import { CadastroCartaoPageModule } from './pages/modals/cadastro-cartao/cadastro-cartao.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CadastroCartaoPage } from './pages/modals/cadastro-cartao/cadastro-cartao.page';
import { SelecaoServicoPage } from './pages/modals/selecao-servico/selecao-servico.page';
import { ConectionStatusPage } from './pages/modals/conection-status/conection-status.page';
import { NotificaoSolicitacaoPage } from './pages/modals/notificao-solicitacao/notificao-solicitacao.page';
import { NotificacaoSolicitacaoNegadaPage } from './pages/modals/notificacao-solicitacao-negada/notificacao-solicitacao-negada.page';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SelecaoServicoPage,
    ConectionStatusPage,
    CustomMenuComponent,
    NotificaoSolicitacaoPage,
    NotificacaoSolicitacaoNegadaPage,
  ],
  entryComponents: [
    CadastroCartaoPage,
    SelecaoServicoPage,
    ConectionStatusPage,
    CustomMenuComponent,
    NotificaoSolicitacaoPage,
    NotificacaoSolicitacaoNegadaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IntroModalPageModule,
    IonicModule.forRoot(),
    RecuperarSenhaPageModule,
    CadastroCartaoPageModule,
    SocketIoModule.forRoot(environment.socketIoConfig)
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
