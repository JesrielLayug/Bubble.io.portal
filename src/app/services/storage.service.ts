import { Injectable } from '@angular/core';

const User_Key = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getUser(): any {
    const user = window.localStorage.getItem('token');
    if(user){
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem('token');
    if(user){
      return true;
    }
    return false;
  }
}
