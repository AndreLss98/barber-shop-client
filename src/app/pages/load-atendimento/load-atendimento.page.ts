import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ProfissionaisService } from 'src/app/services/profissionais/profissionais.service';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';
import { MP_SUCCESS_URL, MP_ERROR_URL } from 'src/app/constants/constants';

@Component({
  selector: 'app-load-atendimento',
  templateUrl: './load-atendimento.page.html',
  styleUrls: ['./load-atendimento.page.scss'],
})
export class LoadAtendimentoPage implements OnInit {

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
      const browser = this.iab.create(response.init_point, '_self', options);
      browser.on('loadstop').subscribe(() => {
        let currentUrl: string = '';
        let myInterval = setInterval(() => {
          browser.executeScript({code: 'window.location.href'}).then((location) => {
            currentUrl = location[0];
            if (currentUrl.startsWith(MP_SUCCESS_URL) || currentUrl.startsWith(MP_ERROR_URL)) {
              clearInterval(myInterval);
              browser.close();
             this.sendRequest(currentUrl); 
            }
          });
        }, 3000);
      });
    }, (error) => {
      console.error(error);
    });
  }

  private sendRequest(backUrl: string) {
    if (backUrl.startsWith(MP_SUCCESS_URL)) {
      this.agendaService.sendRequisitionOfService().subscribe((response: any) => {
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
