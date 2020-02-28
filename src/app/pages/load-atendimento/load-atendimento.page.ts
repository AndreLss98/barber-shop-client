import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { servico } from 'src/app/models/servico.model';
import { BASE_URL } from 'src/environments/environment';
import { MP_SUCCESS_URL, MP_ERROR_URL } from 'src/app/constants/constants';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';
import { ProfissionaisService } from 'src/app/services/profissionais/profissionais.service';

@Component({
  selector: 'app-load-atendimento',
  templateUrl: './load-atendimento.page.html',
  styleUrls: ['./load-atendimento.page.scss'],
})
export class LoadAtendimentoPage implements OnInit {

  private myInterval;
  private browser;

  constructor(
    private route: Router,
    private iab: InAppBrowser,
    private agendaService: AgendaService,
    private mercadopagoService: MercadopagoService,
    private profissionalService: ProfissionaisService,
  ) {

  }

  ngOnInit() {
    this.mercadopagoService.createPayment().subscribe((response: any) => {
      const options: InAppBrowserOptions = {
        location: 'no',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        hardwareback: 'no',
        hidenavigationbuttons: 'yes',
        hideurlbar: 'yes'
      }
      // this.browser = this.iab.create(response.init_point, '_self', options);
      this.browser = this.iab.create(response.sandbox_init_point, '_self', options);
      this.browser.on('loadstop').subscribe(() => {
        let currentUrl: string = '';
        this.myInterval = setInterval(() => {
          this.browser.executeScript({code: 'window.location.href'}).then((location) => {
            currentUrl = location[0];
            if (currentUrl.startsWith(BASE_URL + MP_SUCCESS_URL) || currentUrl.startsWith(BASE_URL + MP_ERROR_URL)) {
              clearInterval(this.myInterval);
              this.browser.close();
             this.sendRequest(currentUrl, response.id); 
            }
          });
        }, 3000);
      });
    }, (error) => {
      console.error(error);
    });
  }

  ionViewWillLeave() {
    this.agendaService.newService.servicos = [];
    clearInterval(this.myInterval);
  }

  private sendRequest(backUrl: string, paymentid: string) {
    if (backUrl.startsWith(BASE_URL + MP_SUCCESS_URL)) {
      this.agendaService.sendRequisitionOfService(paymentid).subscribe((response: any) => {
        if (response.error) {
          console.log(response);
          this.route.navigateByUrl('falha-pagamento');    
        } else {
          this.profissionalService.sendRequestViaSocket(response.data.registerService.idservico);
          this.route.navigateByUrl('confirmacao-agenda');
        }
      }, (error) => {
        console.log(error);
        this.route.navigateByUrl('falha-pagamento');
      });
    } else {
      this.route.navigateByUrl('falha-pagamento');
    }
  }

}
