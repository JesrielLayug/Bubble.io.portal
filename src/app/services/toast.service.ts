import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InfoToastComponent } from '../components/toasts/info-toast/info-toast.component';
import { WarnToastComponent } from '../components/toasts/warn-toast/warn-toast.component';
import { ErrorToastComponent } from '../components/toasts/error-toast/error-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastComponentRef: ComponentRef<any> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ){}

  showInfoToast(message: string): void {
    this.showToast(InfoToastComponent, message);
  }

  showWarnToast(message: string): void {
    this.showToast(WarnToastComponent, message);
  }

  showErrorToast(message: string): void {
    this.showToast(ErrorToastComponent, message);
  }

  private showToast(toastComponent: any, message: string): void{
    const factory = this.componentFactoryResolver.resolveComponentFactory(toastComponent);
    const componentRef: ComponentRef<any> = factory.create(this.injector);

    componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElement);

    this.toastComponentRef = componentRef;

    setTimeout(() => {
      this.removeToast();
    }, 5000);
  }
  
  private removeToast(): void {
    if(this.toastComponentRef){
      this.appRef.detachView(this.toastComponentRef.hostView);
      this.toastComponentRef.destroy();
      this.toastComponentRef = null;
    }
  }
}
