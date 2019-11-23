import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BASE_URL } from '../../../environments/environment'
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  public login(email: string, senha: string) {
    const body = `{loginCliente(input: {email: "${email}", senha:"${senha}"}){nome telefone email}}`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
