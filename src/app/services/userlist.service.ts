import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { Users } from './user.model';

export interface UserMaster{
  
    UserId:number;
    UserName:string;
    UserPassword:string;
    Email:string;
    ContactId: number;
    LastLoginDate:Date;
    IsActive:boolean;
    LoginFailStreak: number;
    LoginFailTotal: number;
    CreatedBy: number;
    DateCreated:Date;
    ModifiedBy: number;
    DateModified:Date;
    DeletedBy: number;
    DateDeleted:Date;
    IsDeleted: number;
    PrimaryOfficeId: number;
    ProfileId: number;
    DateLocked:Date;
    ManagerId: number;
    UserDisplayName:string;

}


@Injectable({
  providedIn: 'root'
})
export class UserListService {

  userlistData: Users = new Users();


  clist: Users[] = [];

  users: Users[];

  users1:any;

  baseDomain: string;
  baseURL: string;

  constructor(private http: HttpClient, public service: AppConfigService) {

    this.baseDomain = this.service.apiBaseUrl;
    console.log(this.baseDomain);
    this.baseURL = this.baseDomain + 'api/cargo';

   }

   postWebContent() {
    return this.http.post(this.baseURL, this.userlistData);
  }
  putWebContent() {
    console.log('put');
    console.log(this.userlistData);
    return this.http.put(`${this.baseURL}/${this.userlistData.UserId}`, this.userlistData);
  }
  deleteWebContent(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    console.log('refresh list service called');
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.clist = res as Users[];
        console.log('response received');
        console.log(this.clist);
      });
  }




 

}
