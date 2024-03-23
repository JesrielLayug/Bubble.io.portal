import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.css'
})
export class ErrorToastComponent implements OnInit {
  message: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'opacity 1s ease-in-out');
    setTimeout(() => {
      this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '0');
      this.renderer.listen(this.elementRef.nativeElement, 'transitionend', () => {
        this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this.elementRef.nativeElement);
      });
    }, 3000); // Adjusted the timeout to 3000 milliseconds (3 seconds)
  }
}
