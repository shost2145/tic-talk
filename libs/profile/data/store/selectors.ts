import {createSelector} from '@ngrx/store';
import {proleFeature} from './reducer';
import { Profile } from '../../../data_acess/src/lib/data_acess';



export const selectFilteredProfiles = createSelector(
  proleFeature.selectProfiles,
  (profiles: Profile[]) => profiles

)
