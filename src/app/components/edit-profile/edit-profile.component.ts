import { Component } from '@angular/core';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [UploadImageComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
