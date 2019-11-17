import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BASE_URL } from '../../../environments/environment'
import { Client } from 'src/app/models/cliente.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/graphql' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario: Client = null;

  constructor(private http: HttpClient) {

  }

  get usuario(): Client {
    return this._usuario;
  }

  set usuario(usuario: Client) {
    this._usuario = usuario;
  }

  public login(email: string, senha: string) {
    const body = `{loginCliente(input: {email: "${email}", senha:"${senha}"}){nome telefone}}`
    return this.http.post(BASE_URL, body, httpOptions);
  }
}
