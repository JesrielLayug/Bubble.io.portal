import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpResponse, HttpStatusCode, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAthenticationSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAthenticationSubject.asObservable();

  private token: string | null = null;

  constructor(private Httpclient: HttpClient) { 
    this.checkAuthentication();
  }

  login(email: string, password: string): Observable<{ isSuccess: boolean; message: string }> {
    const user: User = {
      email: email,
      password: password
    };
    return this.Httpclient.post<HttpResponse<Claim>>(`${environment.apiUrl}login`, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.setToken(response.body.accessToken); // Use response.body to access the body of the response
            return {
              isSuccess: true,
              message: "Login Success!"
            };
          } else {
            return {
              isSuccess: false,
              message: "Error login processed"
            };
          }
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

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

  logout(){
    this.token = null;
    localStorage.removeItem('token');
    this.isAthenticationSubject.next(false);
  }

  private checkAuthentication(){
    const storedToken = localStorage.getItem('token');
    if(storedToken){
      this.token = storedToken;
      this.isAthenticationSubject.next(true);
    }
  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
    this.isAthenticationSubject.next(true);
  }

  getAuthorizationHeader(): HttpHeaders{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
    return headers;
  }
}

