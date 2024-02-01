
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
   // return this.http.get('./assets/apisettings.')
     return this.http.get('../../assets/apisettings.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get apiBaseUrl() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiBaseUrl;
  }

}
