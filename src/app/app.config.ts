import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    provideRouter(routes), 
    provideHttpClient(), 
    provideAnimations(),
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ]
};
