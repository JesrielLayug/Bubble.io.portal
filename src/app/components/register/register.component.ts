import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUser: User = new User();

  constructor(private authService: AuthService){}

  registerUser() {
    this.authService.register(this.newUser).subscribe({
      next: (response: Response) => {
        if(response.isSuccess){
          console.log(response.message);
        }
        else{
          console.log(response.message);
        }
      }
    }
    )
  }

}
