import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

import { BASE_URL_GRAPHQL } from './../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';
import { Client } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) {

  }

  public cadastrar(cadastro: Client) {
    /* const body = `mutation{createCliente(input: {nome: "${cadastro.nome}", email: "${cadastro.email}", telefone: "${cadastro.telefones[0].numero}", senha: "${cadastro.}"}){nome telefone email}}`;
    return this.http.post(BASE_URL_GRAPHQL, body,  HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE)); */
  }
}
