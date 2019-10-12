import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro-cadastro',
  templateUrl: './erro-cadastro.page.html',
  styleUrls: ['./erro-cadastro.page.scss'],
})
export class ErroCadastroPage implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  public goToLogin() {
    this.router.navigateByUrl('login');
  }

}
