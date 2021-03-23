import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(userDatas: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userDatas);
  }

  login(userDatas: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userDatas);
  }
}