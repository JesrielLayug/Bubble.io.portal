import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpResponse, HttpStatusCode, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Response } from '../models/response';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Httpclient: HttpClient) { }

  register(user: User): Observable<Response> {
    return this.Httpclient.post(`${environment.apiUrl}register`, user, { observe: 'response' }).pipe(
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
        console.error('Error during registration:', error);

      let errorMessage = 'An error occurred during registration.';
          
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) {
          errorMessage = 'Bad Request. Please check your input data.';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized. Please check your credentials.';
        } else {
          errorMessage = `Server returned status ${error.status}.`;
        }
      }
    
      return throwError(errorMessage);
      })
    );
  }
}

