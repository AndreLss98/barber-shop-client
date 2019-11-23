import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public closeMenu(): void {
    this.modalCtrl.dismiss();
  }

  public navigatePage(page: string) {
    if (page === "perfil") {
      this.router.navigateByUrl("home/perfil");
    } else if (page === "cartao") {
      this.router.navigateByUrl("home/cartoes");
    } else if (page === "historico") {
      this.router.navigateByUrl("home/historico");
    } else if (page === 'agenda') {
      this.router.navigateByUrl("home/agenda");
    } else if (page === "chat") {
      this.router.navigateByUrl("home/home-chat")
    }

    this.closeMenu();
  }

}
