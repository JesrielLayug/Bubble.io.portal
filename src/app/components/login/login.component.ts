import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Response } from '../../models/response';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService){}

  

}
