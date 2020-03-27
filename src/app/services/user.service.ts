import { from } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { CartaoService } from './cartao/cartao.service';

import { Client } from '../models/cliente.model';
import { BASE_URL_GRAPHQL, BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from '../constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: Client = null;
  
  private fileTransfer: FileTransferObject;

  constructor(
    private http: HttpClient,
    private transfer: FileTransfer,
    private cartoesService: CartaoService
  ) {

  }

  get user(): Client {
    return this._user;
  }

  set user(user: Client) {
    if (user.cartoes) this.cartoesService.localCards = user.cartoes;
    this._user = user;
  }

  public updateUserPosition({latitude, longitude}) {
    this._user.latitude = latitude;
    this._user.longitude = longitude;
    const body = `mutation{setLocation(input: {idcliente: ${this._user.idcliente}, latitude: ${latitude}, longitude: ${longitude}})}`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public uploadImg(imagePath: string, endPoint: string, idcliente: number) {
    this.fileTransfer = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      headers: {idcliente: idcliente},
      chunkedMode: false
    }
    return from(this.fileTransfer.upload(imagePath, `${BASE_URL}/cliente/${endPoint}`, options));
  }

}
