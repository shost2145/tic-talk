import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PostService} from "../../../../../data_acess/src/lib/data_acess/posts/services/post.service";
import {postAction} from "./actions";
import {map, switchMap} from "rxjs";

@Injectable({providedIn: 'root',})

export class PostEffect {
  actions$ = inject(Actions)
  postService = inject(PostService);

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postAction.createPost),
      switchMap(({ payload }) => {
        return this.postService.createPost(payload).pipe(
          switchMap(() => this.postService.fetchPosts()),
          map(posts => postAction.setPosts({ posts }))
        )
      })
    );
  });

  fetchPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postAction.fetchPosts),
      switchMap(({}) => {
        return this.postService.fetchPosts().pipe(
          map(posts => postAction.setPosts({posts: posts}))
        )
      })
    )
  })


}








