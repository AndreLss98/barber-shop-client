import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartaoService } from './cartao/cartao.service';

import { Client } from '../models/cliente.model';
import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS } from '../constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: Client = null;

  constructor(
    private http: HttpClient,
    private cartoesService: CartaoService
  ) {

  }

  get user(): Client {
    return this._user;
  }

  set user(user: Client) {
    this.cartoesService.localCards = user.cartoes;
    this._user = user;
  }

  public updateUserPosition({latitude, longitude}) {
    this._user.latitude = latitude;
    this._user.longitude = longitude;
    const body = `mutation{setLocation(input: {idcliente: ${this._user.idcliente}, latitude: ${latitude}, longitude: ${longitude}})}`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS);
  }

}
