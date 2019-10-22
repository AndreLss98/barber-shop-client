import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'conection-status',
  templateUrl: './conection-status.page.html',
  styleUrls: ['./conection-status.page.scss'],
})
export class ConectionStatusPage implements OnInit {

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {
    
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
