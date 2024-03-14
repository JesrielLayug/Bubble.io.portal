import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DrawerComponent, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'bubble.io.portal';

  isLoggedIn = false;

  constructor(private Router: Router, private AuthService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.AuthService.checkAuthentication();

      if(this.isLoggedIn){
        this.Router.navigate(['/']);
      }
      else{
        this.Router.navigate(['login'])
      }
  }
}
