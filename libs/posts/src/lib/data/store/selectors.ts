
import {createSelector} from "@ngrx/store";
import {postFeature} from "./reducer";
import {Post} from "../../../../../data-access/src";


export const selectPosts = createSelector(
  postFeature.selectPosts,
  (posts: Post[]) => posts)



