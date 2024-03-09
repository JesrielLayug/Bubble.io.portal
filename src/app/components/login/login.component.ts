import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterComponent, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule, 
    ToastComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: User = new User();

  constructor(private AuthService: AuthService, private FormBuilder: FormBuilder){}

  ngOnInit(): void {
      this.loginForm = this.FormBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
  }

  loginUser(){
    if(this.loginForm.valid){
      this.user.email = this.loginForm.get('email')?.value;
      this.user.password = this.loginForm.get('password')?.value;
      this.AuthService.login(this.user.email, this.user.password)
      .subscribe({
        next: (response: Response) => {
          if(response.isSuccess){
            console.log(response.message);
          }
          else{
            console.log(response.message)
          }
        }
      })
    }
  }
}
