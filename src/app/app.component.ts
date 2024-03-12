import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DrawerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'bubble.io.portal';

  isLoggedIn = false;

  constructor(private StorageService: StorageService, private Router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.StorageService.isLoggedIn();

      if(this.isLoggedIn){
        this.Router.navigate(['/']);
      }

      this.Router.navigate(['login'])
  }
}
