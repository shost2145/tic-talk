import { Routes } from '@angular/router';
import { canActivateAuth } from '../../../../libs/auth/src';
import { LayoutComponent } from '../../../../libs/layout/src';
import { chatsRoutes } from '../../../../libs/chats/src/lib/feature-chats-workspace/chats-page/chatsRoutes';
import { LoginPageComponent } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import { ProfilePageComponent } from '../../../../libs/profile/src';
import { SearchPageComponent } from '../../../../libs/profile/src';
import { SettingsPageComponent } from '../../../../libs/profile/src';
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {ProfileEffects, proleFeature} from "../../../../libs/profile/src";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search',
        component: SearchPageComponent,
      providers:[
        provideState(proleFeature),
        provideEffects(ProfileEffects)
      ]},
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
