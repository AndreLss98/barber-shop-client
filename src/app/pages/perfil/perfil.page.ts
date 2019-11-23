import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public isExpendedName: boolean = false;
  public arrowName: string = 'ios-arrow-forward';

  constructor(
    private navCtrl: NavController,
    public userService: UserService
  ) {

  }

  ngOnInit() {

  }

  public logout() {
    this.navCtrl.navigateBack('login');
    this.userService.user = null;
  }

  public extendColName() {
    this.isExpendedName = !this.isExpendedName;
    this.isExpendedName? this.arrowName = 'ios-arrow-down' : this.arrowName = 'ios-arrow-forward';
  }

}
