import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL_GRAPHQL } from '../../../environments/environment'
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {

  }

  public login(email: string, senha: string) {
    const body =
    `{
      loginCliente(email: "${email}", senha: "${senha}") {
        idcliente nome email imgperfil
        telefones {
          ddd numero
        }
        cartoes {
          idcartao numero nome cvv datavalidade
        }
      }
    }`
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
