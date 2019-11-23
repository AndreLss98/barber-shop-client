import { Injectable } from '@angular/core';
import { Client } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: Client = null;

  constructor() { 

  }

  get user(): Client {
    return this._user;
  }

  set user(user: Client) {
    this._user = user;
  }
}
