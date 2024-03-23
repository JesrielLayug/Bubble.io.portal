import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageData: { imageData: string | null, filename: string | null } | null = null;

  setImageData(data: { imageData: string | null, filename: string | null }) {
    this.imageData = data;
  }

  getImageData(): { imageData: string | null, filename: string | null } | null {
    return this.imageData;
  }
}
