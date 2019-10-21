import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RecuperarSenhaPageModule } from './pages/modals/recuperar-senha/recuperar-senha.module';
import { IntroModalPageModule } from './pages/modals/intro-modal/intro-modal.module';
import { CadastroCartaoPage } from './pages/modals/cadastro-cartao/cadastro-cartao.page';
import { CadastroCartaoPageModule } from './pages/modals/cadastro-cartao/cadastro-cartao.module';
import { SelecaoServicoPage } from './pages/modals/selecao-servico/selecao-servico.page';
import { ConnectionStatusPage } from './pages/modals/connection-status/connection-status.page';

@NgModule({
  declarations: [AppComponent, SelecaoServicoPage, ConnectionStatusPage],
  entryComponents: [
    CadastroCartaoPage,
    SelecaoServicoPage,
    ConnectionStatusPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    RecuperarSenhaPageModule,
    IntroModalPageModule,
    CadastroCartaoPageModule
  ],
  providers: [
    Network,
    StatusBar,
    Geolocation,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
