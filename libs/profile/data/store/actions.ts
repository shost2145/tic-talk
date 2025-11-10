import {createActionGroup, props} from '@ngrx/store';
import { Profile } from '../../../data_acess/src/lib/data_acess';


export const profileActions=createActionGroup({
source:'profile',
events: {
  'filter events':props<{filters:Record<string, any>}>(),
  'profiles loaded':props<{profiles:Profile[]}>()
}
})
