import { timeout } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { BASE_URL_GRAPHQL } from '../../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  public formGroup: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {

  }

  public sendEmail() {
    const body =
    `{
      getSenhaCliente(email: "${this.formGroup.value.email}")
    }`;

    this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE)).subscribe((response: any) => {
      if (response.errors) {
        console.log('Error: ', response.errors)
      } else {
        this.openAlert();
      }
    }, (error) => console.log(error));
  }

  public async openAlert() {
    this.alertCtrl.create({
      header: "Atenção",
      message: "E-mail enviado com sucesso para recuperar a senha.",
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.formGroup.patchValue({
              email: ''
            });
            this.modalCtrl.dismiss();
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}