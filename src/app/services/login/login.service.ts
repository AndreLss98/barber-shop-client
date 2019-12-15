import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from '../../../environments/environment'
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  public login(email: string, senha: string) {
<<<<<<< HEAD
    const body =
    `{
      loginCliente(email: "${email}", senha: "${senha}") {
        idcliente nome sobrenome email telefones {
          ddd numero
        }
      }
    }`
=======
    const body = `{loginCliente(email: "${email}", senha:"${senha}"){idcliente nome sobrenome email telefones{ddd numero}}}`;
>>>>>>> cdb4c2f60a0e8d8d89ff799c2a00c5e96227bafb
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
