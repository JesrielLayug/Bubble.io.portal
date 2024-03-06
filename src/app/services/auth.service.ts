import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Response } from '../models/response';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  register(user: User): Observable<Response> {
    return this.httpclient.post(`${environment.apiUrl}/register`, user, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          return {
            isSuccess: true,
            message: "Successfully register user"
          };
        } else {
          return {
            isSuccess: false,
            message: "Failed to register user"
          };
        }
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}

