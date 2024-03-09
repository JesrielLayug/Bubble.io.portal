import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    CommonModule,
    ToastComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  newUser: User = new User();

  constructor(private authService: AuthService, private formBuilder: FormBuilder){}
  
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
            console.log(response.message);
          }
          else{
            console.log(response.message);
          }
        }
      })
    }
  }

}
