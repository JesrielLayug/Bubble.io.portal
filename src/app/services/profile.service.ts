import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Profile } from '../models/profile';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, forkJoin, throwError } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private HttpClient: HttpClient) { }

  async get(): Promise<Observable<Profile>> {
    try{
      const info$ = await this.HttpClient.get<Profile>(
        `${environment.apiUrl}/Profile/Get`
      );

      return info$;
    }  
    catch(error: any){
      console.error(error);
      throw error;
    };
  }

  async getAll(): Promise<Observable<Array<Profile>>> {
    try{
      const response = await this.HttpClient.get<Array<Profile>>(
        `${environment.apiUrl}/Profile/GetAll`
      );

      return response;
    }
    catch(error: any){
      console.error(error);
      throw error;
    }
  }

  async add(profile: Profile): Promise<Response> {
    try {
        const requestData = {
          firstname: profile.firstname,
          lastname: profile.firstname,
          bio: profile.bio,
          imageData: profile.imageData,
          imageUrl: profile.imageUrl
        };
    
        const httpResponse = await this.HttpClient.post<any>(
            `${environment.apiUrl}/Profile/Add`,
            requestData,
            {observe: 'response'}
        ).toPromise();

        if (httpResponse !== null && httpResponse !== undefined) {
          const response: Response = {
            isSuccess: httpResponse.ok,
            message: httpResponse.ok ? 'Successfully updated your profile.' : 'Failed to update your profile.'
          };
  
          return response;
        } else {
          throw new Error('HTTP response is undefined');
        }
    } catch (error: any) {
      if (error instanceof HttpErrorResponse && error.status === 200) {
        const response: Response = {
          isSuccess: true,
          message: 'Successfully updated your profile.'
        };
        return response;
      } else {
        console.error('Error occurred:', error);
        throw error;
      }
    }
  }

  async update(profile: Profile): Promise<Response>{
    try{
      const httpResponse = await this.HttpClient.put<Profile>(
        `${environment.apiUrl}/Profile/Update`,
        profile,
        {observe: 'response'}
      ).toPromise();
  
      if(httpResponse !== null && httpResponse !== undefined){
        const response: Response = {
          isSuccess: httpResponse.ok,
          message: httpResponse.ok ? 'Successfully updated your profile.' : 'Failed to update your profile.'
        };
  
        return response;
      }
      else{
        throw new Error('HTTP response is undefined');
      }
    }
    catch(error: any){
      console.error('Error occured:', error);
      throw error;
    }
  }

}
