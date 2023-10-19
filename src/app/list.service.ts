import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

 
  constructor(public _httpClient:HttpClient) { }

  

  GetState(){
    return this._httpClient.get("/assets/States.json")
  }

  GetCity(){
    return this._httpClient.get("/assets/City.json")
  }

  getVillages(){
    return this._httpClient.get("/assets/Taluk.json")
  }

  getCarModel(){
    return this._httpClient.get("/assets/Carmodel.json")
  }
}
