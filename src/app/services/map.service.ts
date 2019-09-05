import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = { };

  constructor() { }

  public getMap() {
    return this.map;
  }

  public setMap(mapObj: any) {
    this.map = mapObj;
  }
}
