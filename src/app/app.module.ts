import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RecuperarSenhaPageModule } from './pages/modals/recuperar-senha/recuperar-senha.module';
import { IntroModalPageModule } from './pages/modals/intro-modal/intro-modal.module';
import { CadastroCartaoPage } from './pages/modals/cadastro-cartao/cadastro-cartao.page';
import { CadastroCartaoPageModule } from './pages/modals/cadastro-cartao/cadastro-cartao.module';
import { SelecaoServicoPage } from './pages/modals/selecao-servico/selecao-servico.page';

@NgModule({
  declarations: [AppComponent, SelecaoServicoPage],
  entryComponents: [
    CadastroCartaoPage,
    SelecaoServicoPage
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
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
