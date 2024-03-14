import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<any>();

  async showToast(message: string) {
    this.toastSubject.next({ message });
  }

   getToast(): Observable<any> {
    return this.toastSubject.asObservable();
  }
}
