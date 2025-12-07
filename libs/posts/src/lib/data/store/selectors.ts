
import {createSelector} from "@ngrx/store";
import {postFeature} from "./reducer";
import {Post} from "../../../../../data_acess/src/lib/data_acess";

export const selectPosts = createSelector(
  postFeature.selectPosts,
  (posts: Post[]) => posts)



