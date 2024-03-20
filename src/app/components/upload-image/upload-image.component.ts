import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  @Output()
  imageUploaded: EventEmitter<{imageUrl: string, imageData: FormData}> = new EventEmitter();


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
        const formData = new FormData();
        formData.append('file', file);
        this.imageUploaded.emit({imageUrl: this.imagePreview, imageData: formData});
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
