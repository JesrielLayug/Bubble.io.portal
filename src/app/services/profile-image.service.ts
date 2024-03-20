import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileImage } from '../models/profileImage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor(private HttpClient: HttpClient) { }

  async add(profileImage: ProfileImage): Promise<any>{
    try{
      const http = await this.HttpClient.post<ProfileImage>(
        `${environment.apiUrl}/ProfileImage/Add`, profileImage
      ).toPromise();
  
      return http;
    }
    catch(error: any){
      console.error(error);
      throw error;
    }
  }
}
