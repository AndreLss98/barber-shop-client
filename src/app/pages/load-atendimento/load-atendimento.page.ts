import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-atendimento',
  templateUrl: './load-atendimento.page.html',
  styleUrls: ['./load-atendimento.page.scss'],
})
export class LoadAtendimentoPage implements OnInit {

  constructor(private route: Router) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.route.navigateByUrl('confirmacao-agenda');
    }, 1000);
  }

}
