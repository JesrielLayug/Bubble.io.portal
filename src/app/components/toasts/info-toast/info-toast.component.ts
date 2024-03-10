import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-toast.component.html',
  styleUrl: './info-toast.component.css'
})
export class InfoToastComponent {
  // @Input() summary: string = '';
  @Input() message: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private toastService: ToastService) {}

  async ngAfterViewInit(): Promise<void> {
    this.toastService.getToast().subscribe((toast) => {
      this.message = toast.message;

      this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'opacity 1s ease-in-out');
      setTimeout(() => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '0');
        this.renderer.listen(this.elementRef.nativeElement, 'transitioned', () => {
          this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this.elementRef.nativeElement);
        });
      }, 1000);
    });
  }
}
