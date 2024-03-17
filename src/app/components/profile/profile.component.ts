import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EditProfileComponent, CommonModule, LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  profile: Observable<Profile> | null = null;

  constructor(private ProfileService: ProfileService){}

  async ngOnInit(): Promise<void> {
      this.profile = await this.ProfileService.get();
  }
}
