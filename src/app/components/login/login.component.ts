import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoToastComponent } from '../toasts/info-toast/info-toast.component';
import { ToastService } from '../../services/toast.service';
import { WarnToastComponent } from '../toasts/warn-toast/warn-toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterComponent, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule, 
    InfoToastComponent,
    WarnToastComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: User = new User();

  toastMessage: string ='';
  isSuccess = false;
  
  constructor(
    private AuthService: AuthService, 
    private FormBuilder: FormBuilder,
    private toastService : ToastService,
    private Router: Router
    ){}

  ngOnInit(): void {


      this.loginForm = this.FormBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
  }

  async loginUser(){
    if(this.loginForm.valid){
      this.user.email = this.loginForm.get('email')?.value;
      this.user.password = this.loginForm.get('password')?.value;

      try{
        const response = await this.AuthService.login(this.user.email, this.user.password);

        this.isSuccess = response.isSuccess;
        this.toastMessage = response.message;

        if(response.isSuccess){
          console.log(response.message);
          this.Router.navigate(['/']);
          await this.toastService.showToast(this.toastMessage);
        }
        else{
          console.log(response.message);
          await this.toastService.showToast(this.toastMessage);
        }
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
