import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {profileActions} from './actions';
import {map, switchMap, withLatestFrom} from 'rxjs';
import {ProfileService} from "../../../data_acess/src/lib/data_acess";
import {Store} from "@ngrx/store";
import {selectProfileFilters, selectProfilePage} from "./selectors";

@Injectable({
    providedIn: 'root',
  }
)
export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)
  store = inject(Store)


  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        profileActions.setPage,
        profileActions.filterEvents),
      withLatestFrom(
        this.store.select(selectProfileFilters),
        this.store.select(selectProfilePage)
      ),
      switchMap(([_, filters, pageable]) => {
        console.log([_, filters, pageable])
        return this.profileService.filterProfiles({
          ...pageable,
          ...filters
        })
      }),

      map(res =>
        profileActions.profilesLoaded({profiles: res.items}))
    )
  })
}

