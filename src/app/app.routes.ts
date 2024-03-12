import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    // {path: 'home', component: HomeComponent},
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path: '',
     component: HomeComponent,
     children: [
        {path: '', component: ProfileComponent}
     ]}
];
