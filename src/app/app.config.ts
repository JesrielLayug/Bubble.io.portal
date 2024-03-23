import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor } from './helper/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
    {
      provide:HTTP_INTERCEPTORS,
      useClass:CustomHttpInterceptor,
      multi:true
    }
  ]
};
