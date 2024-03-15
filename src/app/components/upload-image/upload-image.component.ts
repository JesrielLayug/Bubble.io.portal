import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  filename: string | null = null;
  imagePreview: string | null = null;
  isEventListenerAdded: boolean = false;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.filename = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        if (!this.isEventListenerAdded) {
          this.isEventListenerAdded = true;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.filename = null;
      this.imagePreview = null;
      this.isEventListenerAdded = false;
    }
  }

}
