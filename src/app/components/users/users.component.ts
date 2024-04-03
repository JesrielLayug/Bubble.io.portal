import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: Observable<Array<Profile>> | null = null;

  imageSrc: string | null = null;

  constructor(private ProfileService: ProfileService, private Router: Router) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.ProfileService.getAll();

    this.users.subscribe((users) => {
      users.forEach((user) => {
        this.imageSrc = `data:image/png;base64,${user.imageData}`;
      });
    });
  }
}
