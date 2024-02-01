import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseApiUrl: string = environment.baseApiUrl
  constructor( private http: HttpClient) { }
  getAllCustomers(cname: string): Observable<customer[]>{
    return this.http.get<customer[]>( this.baseApiUrl + '/api/customer/check/'+cname);
  }
}

