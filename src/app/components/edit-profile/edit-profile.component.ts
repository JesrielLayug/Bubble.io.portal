import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { ToastService } from '../../services/toast.service';
import { InfoToastComponent } from '../toasts/info-toast/info-toast.component';
import { WarnToastComponent } from '../toasts/warn-toast/warn-toast.component';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  // @Output() isUpdateSuccess: EventEmitter<any> = new EventEmitter();

  profile = new Profile();
  profileForm!: FormGroup;

  imageData: { imageData: string | null, filename: string | null } | null = null;

  constructor(
    private router: Router,
    private profileService: ProfileService, 
    private toastService: ToastService, 
    private FormBuilder: FormBuilder,
    private imageService: ImageService){}

    ngOnInit(): void {
        this.profileForm = this.FormBuilder.group({
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          bio: ['', Validators.required]
        });
    }

    async add(): Promise<void> {
      try {
          this.profile.firstname = this.profileForm.get('firstname')?.value;
          this.profile.lastname = this.profileForm.get('lastname')?.value;
          this.profile.bio = this.profileForm.get('bio')?.value;
          this.imageData = this.imageService.getImageData();
  
          // Extract imageData string from the object
          this.profile.imageData = this.imageData?.imageData ?? null;
          this.profile.imageUrl = this.imageData?.filename ?? null;
  
          const profileResponse = await this.profileService.add(this.profile);
  
          if (profileResponse.isSuccess) {
              this.toastService.showInfoToast(profileResponse.message);
              this.reloadPage();
          } else {
              this.toastService.showWarnToast(profileResponse.message);
              this.reloadPage();
          }
      } catch (error: any) {
          console.error(error);
          this.toastService.showErrorToast('Failed to update your profile.');
          // this.isUpdateSuccess.emit(false);
      }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
