import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUser: User = new User();

  constructor(private authService: AuthService){}

  registerUser(user: User) {
    this.authService.register(user).subscribe(
      (Response: Response) => {
        if(Response.isSuccess){
          console.log(Response.message);
        }
        else{
          console.error(Response.message);
        }
      },
      (error) => {
        console.error("Internal server error", error);
      }
    )
  }
}
