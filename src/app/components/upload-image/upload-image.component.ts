import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
})
export class UploadImageComponent {
  constructor(private imageService: ImageService) {}

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

        const base64ImageData = reader.result?.toString().split(',')[1];

        if (base64ImageData !== undefined) {
          const jsonData = {
            imageData: base64ImageData ? base64ImageData || '' : '',
            filename: this.filename ? this.filename || '' : '',
          };

          this.imageService.setImageData(jsonData);
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.filename = null;
      this.imagePreview = null;
    }
  }
}
