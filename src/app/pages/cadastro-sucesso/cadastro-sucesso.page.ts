import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-sucesso',
  templateUrl: './cadastro-sucesso.page.html',
  styleUrls: ['./cadastro-sucesso.page.scss'],
})
export class CadastroSucessoPage implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
    
  }

  public goToHome() {
    this.router.navigateByUrl('login/home');
  }

}
