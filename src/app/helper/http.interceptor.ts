import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the authorization header from the AuthService
    const headers = this.authService.getAuthorizationHeader();

    // Clone the request and set the obtained headers
    const authReq = req.clone({
      headers: headers
    });

    // Continue with the modified request
    return next.handle(authReq);
  }
}
