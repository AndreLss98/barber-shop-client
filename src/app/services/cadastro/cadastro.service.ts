import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

import { BASE_URL_GRAPHQL } from './../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) {

  }

  public cadastrar(cadastro: any) {
    console.log(cadastro);
    let body =
    `mutation {
      registerCliente(nome: "${cadastro.nome}", email: "${cadastro.email}", senha: "${cadastro.senha}", ddd: ${cadastro.telefone.substr(1, 2)}, numero: "${cadastro.telefone.substr(5)}") {
        nome email
        telefones {
          ddd numero
        }
      }
    }`
    console.log('Body: ', body);
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
