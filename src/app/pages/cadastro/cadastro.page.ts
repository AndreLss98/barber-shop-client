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
  private alert: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
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
    this.alert = await this.alertCtrl.create({
      message: "Cadastro realizado com sucesso!",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        }
      ],
      backdropDismiss: false
    });

    await this.alert.present();
  }

}
