import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public cadastroForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ["", [Validators.minLength(3), Validators.pattern('^[a-zA-Z]{3,}( [a-zA-Z]{2,})+$'), Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      senha: ["", [Validators.minLength(6), Validators.required]],
      telefone: ["", [Validators.required]]
    });
  }

  ngOnInit() {

  }

  public formatTelefone() {
    if (this.cadastroForm.value.telefone) {
      let tempTel: string = this.cadastroForm.value.telefone;
      tempTel = tempTel.replace(/[^0-9]/g, '').replace(/([0-9]{2})([0-9]{1})/, "($1) $2").replace(/(\([0-9]{2}\) [0-9]{5})([0-9]{1})/, "$1-$2");
      this.cadastroForm.patchValue({
        telefone: tempTel
      });
    }
  }

  public async registrarCadastro() {
    this.cadastroService.cadastrar(this.cadastroForm.value).subscribe((cadastro: any) => {
      console.log('Cadastro: ', cadastro);
      if (cadastro.errors) {
        this.router.navigateByUrl('erro-cadastro');
      } else {
        this.userService.user = cadastro.data.registerCliente;
        localStorage.setItem('user', JSON.stringify(cadastro.data.registerCliente));
        this.router.navigateByUrl('cadastro-sucesso');
      }
    }, (error) => {
      console.log(error)
    });
  }

}
