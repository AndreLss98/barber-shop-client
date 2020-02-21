import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ProfissionaisService } from 'src/app/services/profissionais/profissionais.service';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';

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
        /* location: 'no',
        clearcache: 'yes',
        clearsessioncache: 'yes', */
        hardwareback: 'no',
        hidenavigationbuttons: 'yes',
        // hideurlbar: 'yes'
      }
      const browser = this.iab.create(response.init_point, '_self', options);
      browser.on('loadstop').subscribe(() => {
        console.log('Parou de carregar');
        browser.executeScript({ code: 'let oldLocation = window.location.href; console.log("OldLocation: ", oldLocation)'});
      });
    }, (error) => {
      console.error(error);
    });
    /* this.agendaService.sendRequisitionOfService().subscribe((response: any) => {
      if (response.error) {
        console.log(response.error);
        this.route.navigateByUrl('falha-pagamento');
      } else {
        console.log(response);
        this.profissionalService.sendRequestViaSocket(response.data.registerService.idservico);
        this.route.navigateByUrl('confirmacao-agenda');
      }
    }, (error: any) => {
      console.log(error);
      this.route.navigateByUrl('falha-pagamento');
    }); */
  }

}
