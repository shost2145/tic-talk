import {createSelector} from '@ngrx/store';
import {proleFeature} from './reducer';
import { Profile } from 'libs/data_acess/src/lib/data_acess/profile/interface/profile.interface';


export const selectFilteredProfiles = createSelector(
  proleFeature.selectProfiles,
  (profiles: Profile[]) => profiles

)
