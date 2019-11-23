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
      nome: [null, [Validators.minLength(3), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      senha: [null, [Validators.minLength(6), Validators.required]],
      telefone: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  public async registrarCadastro() {
    this.cadastroService.cadastrar(this.cadastroForm.value).subscribe((cadastro: any) => {
      if (cadastro.errors) {
        this.router.navigateByUrl('erro-cadastro');
      } else {
        this.userService.user = cadastro.data.createCliente;
        this.router.navigateByUrl('cadastro-sucesso');
      }
    });
  }

}
