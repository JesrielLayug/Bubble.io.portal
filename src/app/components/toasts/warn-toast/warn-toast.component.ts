import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-warn-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warn-toast.component.html',
  styleUrl: './warn-toast.component.css'
})
export class WarnToastComponent {
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
