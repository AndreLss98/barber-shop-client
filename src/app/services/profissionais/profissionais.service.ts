import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from './../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll() {
    const body =
    `{
      profissionais: acceptedProfissionais {
        nome latitude longitude idsocket
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getAllByName(nome: string) {
    const body =
    `{
      profissionaisByName(nome: "${nome}") {
        idprofissional nome latitude longitude idsocket
        valores {
          valor idtiposervico
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
