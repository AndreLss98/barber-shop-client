import { Component, OnInit } from '@angular/core';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { itemAgenda, itemDateAgenda } from 'src/app/models/itemAgenda';
import { PopoverController, ActionSheetController } from '@ionic/angular';
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

  public agenda: itemDateAgenda[] = [];
  public agendaFiltrada: itemAgenda[] = [];

  public currentYear;
  public nameCurrentMoth: string;
  public month = [];

  public selectedDay: number = null;


  constructor(
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController
  ) {

  }

  ngOnInit() {
    this.currentYear = this.agendaService.getYear();
    this.nameCurrentMoth = this.agendaService.getMonthName(this.agendaService.getMonth());
    this.month = this.agendaService.constructMonth(this.agendaService.getDate());
    this.agenda = this.agendaService.getAgenda(this.nameCurrentMoth, this.currentYear);
    this.checkAgenda();
  }

  public async presentPopOver(event: Event) {
    await this.popoverCtrl.create({
      component: MesAgendaComponent,
      event,
      mode: 'ios'
    }).then((popover) => {
      popover.present();
      popover.onDidDismiss().then((popoverdata: any) => {
        this.setMonth(popoverdata.data);
      })
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

  public checkAgenda() {
    this.month.forEach(element => {
      this.agenda.forEach(agenda => {
        if (agenda.day === element.day) {
          element.hasService = true;
          return;
        }
      })
    });
  }

  public selectDay(day, pos) {
    this.selectedDay = pos;
    const tempSelectedDay = this.month[pos];
    this.agenda.forEach(element => {
      if (element.month === this.nameCurrentMoth.toLowerCase() && element.day === tempSelectedDay.day) {
        this.agendaFiltrada = element.items;
        return;
      } else {
        this.agendaFiltrada = [];
      }
    })
  }
}
