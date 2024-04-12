import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  imageData: { imageData: string; filename: string } = {
    imageData: '',
    filename: '',
  };

  setImageData(data: { imageData: string; filename: string }) {
    this.imageData = data;
  }

  getImageData(): { imageData: string; filename: string } {
    return this.imageData;
  }
}
