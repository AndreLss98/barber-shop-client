import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public cadastroForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.cadastroForm = this.formBuilder.group({
      name: [null, [Validators.minLength(3), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      telefone: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  public async registrarCadastro() {
    this.router.navigateByUrl('cadastro-sucesso');
  }

}
