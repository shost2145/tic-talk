import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {profileActions} from './actions';
import { map, switchMap } from 'rxjs';
import { ProfileService } from 'libs/data_acess/src/lib/data_acess/profile/services/profile.service';



@Injectable({
  providedIn: 'root',
  }
)
export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)


  filterProfiles = createEffect(() =>{
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({filters}) => {
        return this.profileService.filterProfiles(filters)}),

      map(res =>
        profileActions.profilesLoaded({profiles:res.items}))
      )
})
}


