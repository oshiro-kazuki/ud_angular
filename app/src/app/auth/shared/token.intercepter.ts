import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.servie';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if(token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ token// Set token here
        }
      })
    }

    return next.handle(req)
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler):
  //   Observable<HttpEvent<any>> {
  //   return next.handle(req);
  // }
}