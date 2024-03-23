import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InfoToastComponent } from '../toasts/info-toast/info-toast.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    CommonModule,
    InfoToastComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  newUser: User = new User();

  isVisible: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private ToastService: ToastService){}
  
  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: this.passwordValidator})
  }

  passwordValidator(formGroup: FormGroup){
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {mismatch: true};
  }

  registerUser() {
    if(this.registerForm.valid){
      this.newUser.email = this.registerForm.get('email')?.value;
      this.newUser.password = this.registerForm.get('password')?.value;
      this.authService.register(this.newUser).subscribe({
        next: (response: Response) => {
          if(response.isSuccess){
            this.ToastService.showInfoToast(response.message);
            console.log(response.message);
            this.isVisible = false;
            this.reloadPage();
          }
          else{
            this.ToastService.showErrorToast(response.message);
            console.log(response.message);
          }
        }
      })
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
