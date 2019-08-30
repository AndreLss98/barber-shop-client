import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides, {static: false}) slides: IonSlides
  public nameButton: string = "Avançar";

  constructor(
    private router: Router
  ) {

  }
  ngOnInit() {

  }

  ionViewDidEnter() {
    console.log(this.slides);
  }

  public nextSlide() {
    this.slides.getActiveIndex().then((res) => {
      res === 1? this.nameButton = "Pronto": this.nameButton = "Avançar";
    });
    this.nameButton === "Avançar"? this.slides.slideNext() : this.router.navigateByUrl('login');
  }

}
