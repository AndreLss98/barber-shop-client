import { Component, OnInit } from '@angular/core';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { itemAgenda } from 'src/app/models/itemAgenda';
import { PopoverController } from '@ionic/angular';
import { MesAgendaComponent } from 'src/app/components/popovers/mes-agenda/mes-agenda.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {


  public slidesConfig = {
    slidesPerView: 7
  }
  
  public agenda: itemAgenda[];
  
  public currentYear;
  public nameCurrentMoth;
  public month = [];
  

  constructor(
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController
  ) { 

  }

  ngOnInit() {
    this.agenda = this.agendaService.getAgenda();
    this.currentYear = this.agendaService.getYear();
    this.nameCurrentMoth = this.agendaService.getMonthName(this.agendaService.getMonth());
    this.month = this.agendaService.constructMonth(this.agendaService.getDate());
  }

  public async presentPopOver(ev: Event) {
    let popover = await this.popoverCtrl.create({
      component: MesAgendaComponent,
      event: ev
    });

    popover.present();

    popover.onDidDismiss().then(popoverdata => {
      this.setMonth(popoverdata.data);
    });
  }

  private setMonth(month: number) {
    let newDate = new Date(this.currentYear, month, 1);
    if (month > this.agendaService.getMonth()) {
      this.nameCurrentMoth = this.agendaService.getMonthName(month);
      this.month = this.agendaService.constructMonth(newDate);
    } else if (month === this.agendaService.getMonth()) {
      this.nameCurrentMoth = this.agendaService.getMonthName(month);
      this.month = this.agendaService.constructMonth(this.agendaService.getDate());
    }
  }

}
