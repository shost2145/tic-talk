import {Post, PostComment} from "../../../../../data_acess/src/lib/data_acess";
import {createFeature, createReducer, on} from "@ngrx/store";
import {postAction} from "./actions";


export interface PostState {
  posts: Post[];
  comments: Record<number, PostComment[]>
}

export const initialState: PostState = {
  posts: [],
  comments: {}
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(postAction.setPosts, (state, { posts }) => ({
      ...state,
      posts
    })),

    // Добавляем один пост (сразу рисуется UI)
    on(postAction.createPostSuccess, (state, { post }) => ({
      ...state,
      posts: [post, ...state.posts]
    }))
  )
});





