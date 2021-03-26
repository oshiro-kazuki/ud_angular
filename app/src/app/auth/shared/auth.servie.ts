import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment';
 
const jwt = new JwtHelperService();

class DecodedToken {
  userId: string = '';
  username: string = '';
  exp: number = 0;
}

@Injectable()
export class AuthService {

  private decodedToken: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.decodedToken = localStorage.getItem('app-meta') || new DecodedToken();
  }

  getToken() {
    return localStorage.getItem('app-auth');
  }

  isAuthenticated() {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  register(userDatas: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userDatas);
  }

  login(userDatas: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userDatas).pipe(map(
      
      (token)=> {
        this.decodedToken = jwt.decodeToken(String(token));
        localStorage.setItem('app-auth', String(token));
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken));
        return token;
      }
    ));
  }

  logout() {
    localStorage.removeItem('app-auth');
    localStorage.removeItem('app-meta');
    this.decodedToken = new DecodedToken();
    this.router.navigate(['/']);

  }
}