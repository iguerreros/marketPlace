import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const DB_ID = environment.DB_ID;
const API_URL = environment.API_URL;
const USER_SESSION_KEY = environment.USER_SESSION_KEY;
const ACCESS_TOKEN_KEY = environment.ACCESS_TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userSession: any;
  private accessToken: any;

  constructor(
      private _httpClient: HttpClient
  ) {
      this.userSession = localStorage.getItem(USER_SESSION_KEY)? JSON.parse(String(localStorage.getItem(USER_SESSION_KEY))) : null;
      this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  httpPost (urlEndPoint, params = {}, isFile = false) {

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.accessToken,
          'app-id': DB_ID
      });

      if(this.userSession){
          headers.append('created_user', this.userSession.usu_id);
      }
  
      return this._httpClient.post(API_URL + urlEndPoint, params, {
          responseType: (isFile)? 'blob' as 'json' : 'json',
          headers
      });    
  }

  httpGet (urlEndPoint) {

      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.accessToken,
          'app-id': DB_ID
      });

      if(this.userSession){
          headers.append('created_user', this.userSession.usu_id);
      }

      return this._httpClient.get(API_URL + urlEndPoint, {headers});
  }

  getUserSession(){
      return this.userSession;
  }

  setUserSession(user: any){
      this.userSession = user;
  }

  setAccessToken(token: string){
      this.accessToken = token;
  }
}
