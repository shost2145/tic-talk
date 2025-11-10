
import {createSelector} from "@ngrx/store";
import {postFeature} from "./reducer";
import {Post} from "../../../../../data_acess/src/lib/data_acess";

export const selectPosts = createSelector(
  postFeature.selectPosts,
  (posts: Post[]) => posts)


// export const selectCommentsByPostId = (postId: number) =>
//   createSelector(
//     postFeature.selectPostFeatureState,
//     (state) => state.comments[postId] || []
//   );



// import {createSelector} from '@ngrx/store';
// import {postFeature} from './reducer';
//
//
// export const selectCommentsByPostId = createSelector(
//  postFeature.selectPosts,
//   (posts) => posts
// )
