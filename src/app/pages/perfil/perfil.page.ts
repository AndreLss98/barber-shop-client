import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public isExpendedName: boolean = false;
  public arrowName: string = 'ios-arrow-forward';

  constructor(
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {

  }

  public logout() {
    this.navCtrl.navigateBack('login');
  }

  public extendColName() {
    this.isExpendedName = !this.isExpendedName;
    this.isExpendedName? this.arrowName = 'ios-arrow-down' : this.arrowName = 'ios-arrow-forward';
  }

}
