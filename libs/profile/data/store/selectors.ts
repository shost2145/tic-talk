import {createSelector} from '@ngrx/store';
import {proleFeature} from './reducer';
import {Profile} from "../../../data-access/src";



export const selectFilteredProfiles = createSelector(
  proleFeature.selectProfiles,
  (profiles: Profile[]) => profiles
)

export const selectProfilePage = createSelector(
  proleFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    }
  }
)

export const selectProfileFilters = createSelector(
  proleFeature.selectProfileFilters,
  (filters) => filters
)
