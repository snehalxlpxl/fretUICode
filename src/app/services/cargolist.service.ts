import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { Cargo } from './cargo.model';
import { Users } from './user.model';



@Injectable({
  providedIn: 'root'
})
export class CargolistService {

  cargolistData: Cargo = new Cargo();


  clist: Cargo[] = [];

  baseDomain: string;
  baseURL: string;
  public kitchenSinkRows=[];

  constructor(private http: HttpClient, public service: AppConfigService) {

    this.baseDomain = this.service.apiBaseUrl;
    console.log(this.baseDomain);
    this.baseURL = this.baseDomain + 'api/cargo';

   }

   postWebContent() {
    return this.http.post(this.baseURL, this.cargolistData);
  }
  putWebContent() {
    console.log('put');
    console.log(this.cargolistData);
    return this.http.put(`${this.baseURL}/${this.cargolistData.CargoId}`, this.cargolistData);
  }
  deleteWebContent(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  

  refreshList() {
    console.log('refresh list service called');
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.clist = res as Cargo[];
        console.log('response received');
        console.log(this.clist);
      });
  }


 

}
