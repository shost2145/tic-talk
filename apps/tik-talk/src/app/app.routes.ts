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
import {ExperimentPageComponent} from "../../../../libs/experiment/src";
import {PostEffect, postFeature} from "../../../../libs/posts/src/lib/data/store";
import {ProfileEffects, proleFeature} from "../../../../libs/profile/data/store";
import {Homework} from "../../../../libs/experiment/src/lib/homework/homework";
import {Homework2} from "../../../../libs/experiment/src/lib/Homework2/Homework2";
import {Homework3} from "../../../../libs/experiment/src/lib/homework3/homework3";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent,
        providers:[
          provideState(postFeature),
          provideEffects(PostEffect)]
      },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'experiments', component: ExperimentPageComponent},
      { path: 'Homework', component: Homework },
      { path: 'Homework2', component: Homework2 },
      { path: 'Homework3', component: Homework3 },
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
