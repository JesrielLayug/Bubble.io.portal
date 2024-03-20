import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
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

      const image$ = await this.HttpClient.get<any>(
        `${environment.apiUrl}/ProfileImage/Get`
      );

      return forkJoin({info: info$, image: image$}).pipe(
        map(({info, image}) => {
          const profile = new Profile();
          profile.id = info.id;
          profile.firstname = info.firstname;
          profile.lastname = info.lastname;
          profile.bio = info.bio;
          profile.email = info.email;
          return profile;
        })
      );
    }  
    catch(error: any){
      console.error(error);
      throw error;
    };
  }

  async add(profile: Profile): Promise<Response>{
    try{
      const http = await this.HttpClient.post<Profile>(
        `${environment.apiUrl}/Profile/Add`, 
        profile, 
        { observe: 'response' }
      ).toPromise();

      const response = new Response();

      if(http && http.status === 200){
        response.isSuccess = true;
        response.message = 'Successfully updated your profile.'
      }
      else{
        response.isSuccess = false;
        response.message = 'Failed to update your profile.'
      }
  
      return response;
    }
    catch(error: any){
      console.error(error);
      throw error;
    }
  }

}
