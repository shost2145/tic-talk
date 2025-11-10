import {Post, PostComment} from "../../../../../data_acess/src/lib/data_acess/posts/interface/post.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {commentAction, postAction} from "./actions";
import {createEffect} from "@ngrx/effects";
import {state} from "@angular/animations";

export interface PostState{
  posts: Post[];
  comments: Record<number,PostComment[]>
}
export const initialState: PostState = {
  posts:[],
  comments: {}
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(postAction.setPosts, (state, payload) => {
      return {
        ...state,
        posts: payload.posts,
      }
    })
  ),
})







// import {createFeature, createReducer, on} from '@ngrx/store';
// import {Post} from "../../../../../data_acess/src/lib/data_acess";
// import {PostComment} from "../../../../../data_acess/src/lib/data_acess/posts/interface/post.interface";
// import {postActions} from "./actions";
//
//
//
// export interface PostState {
//  posts: Post[];
//  comments: Record<number, PostComment[]>;
// }
//
// export const initialState: PostState = {
//   posts:[],
//   comments: {}
// }
//
// export const postFeature = createFeature({
//   name: 'Post',
//   reducer: createReducer(
//     initialState,
//     on(postActions.postsLoaded, (state,{ posts }) =>(
//   {...state,
//     posts})))})


