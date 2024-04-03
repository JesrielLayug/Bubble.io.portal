import { Routes, CanActivateChild } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './helper/auth.guard';
import { ChatHubComponent } from './components/chat-hub/chat-hub.component';

export const routes: Routes = [
  // {path: 'home', component: HomeComponent},
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', component: UsersComponent },
    ],
  },
  { path: 'chat-hub', title: 'ChatHub', component: ChatHubComponent },
];
