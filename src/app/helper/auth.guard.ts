import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateChildFn, CanDeactivateFn, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private AuthService: AuthService, private Router: Router){}

  canActivate(): boolean{
    return this.checkAuth();
  }

  canActivateChild(): boolean {
      return this.checkAuth();
  }

  canLoad(): boolean {
      return this.checkAuth();
  }


  private checkAuth(): boolean{
    if(this.AuthService.checkAuthentication()){
      return true;
    }
    else{
      this.Router.navigate(['/login']);
      return false;
    }
  }
} 