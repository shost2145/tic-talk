import {createFeature, createReducer, on} from '@ngrx/store';
import { profileActions } from './actions';
import { Profile } from '../../../data_acess/src/lib/data_acess';




export interface ProfileState{
  profiles: Profile[],
  profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
  profiles:[],
  profileFilters: {}
}

export const proleFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      return{
      ...state,
      profiles: payload.profiles
      }
    })
    )
})
