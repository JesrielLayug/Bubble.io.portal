import { Component, OnInit } from '@angular/core';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { ToastService } from '../../services/toast.service';
import { InfoToastComponent } from '../toasts/info-toast/info-toast.component';
import { WarnToastComponent } from '../toasts/warn-toast/warn-toast.component';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileImageService } from '../../services/profile-image.service';
import { ProfileImage } from '../../models/profileImage';
import { HttpStatusCode } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    UploadImageComponent, 
    InfoToastComponent, 
    WarnToastComponent, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{

  profile = new Profile();
  profileImage = new ProfileImage();
  profileForm!: FormGroup;

  toastMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private profileService: ProfileService, 
    private toastService: ToastService, 
    private profileImageService: ProfileImageService,
    private FormBuilder: FormBuilder){}

    ngOnInit(): void {
        this.profileForm = this.FormBuilder.group({
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          bio: ['', Validators.required]
        });
    }

  async add(): Promise<void> {

    this.profile.firstname = this.profileForm.get('firstname')?.value;
    this.profile.lastname = this.profileForm.get('lastname')?.value;
    this.profile.bio = this.profileForm.get('bio')?.value;
    
    var profileResponse = (await this.profileService.add(this.profile));
    var profileImageResponse = await this.profileImageService.add(this.profileImage)

    if(profileResponse.isSuccess && profileImageResponse.HttpStatusCode === 200){
      this.isSuccess = true;
      this.toastMessage = profileResponse.message;
      this.toastService.showToast(profileResponse.message);
    }
    else{
      this.isSuccess = false;
      this.toastMessage = profileResponse.message;
      this.toastService.showToast(profileResponse.message)
    }
  }

  handleImageUpload(data: {imageUrl: string, imageData: FormData}){
    this.profileImage.imageData = data.imageData;
    this.profileImage.imageUrl = data.imageUrl;
  }
}
