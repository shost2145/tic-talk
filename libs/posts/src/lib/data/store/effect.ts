import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PostService} from "../../../../../data_acess/src/lib/data_acess/posts/services/post.service";
import {commentAction, postAction} from "./actions";
import {map, switchMap} from "rxjs";
import {PostComment, PostCreateDto} from "../../../../../data_acess/src/lib/data_acess/posts/interface/post.interface";
import {emptyProps} from "@ngrx/store";


@Injectable({providedIn: 'root',})

export class PostEffect {
  actions$ = inject(Actions)
  postService = inject(PostService);

  createPost$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(postAction.createPost),
      switchMap(({})=>{
        return this.postService.fetchPosts().pipe(
          map(posts => postAction.fetchPosts()))
      })
    )
  })

  fetchPost$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(postAction.fetchPosts),
      switchMap(({})=>{
        return this.postService.fetchPosts().pipe(
          map(posts => postAction.setPosts({posts: posts}))
        )
      })
    )
  })

  // createcomment$ = createEffect(()=>{
  //   return this.actions$.pipe(
  //     ofType(commentAction.createComments),
  //     switchMap(({})=>{
  //       return this.postService.getCommentsByPostId().pipe(
  //         map(posts => commentAction.fetchComments()))
  //     })
  //   )
  // })
  // createComment$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(commentAction.createComments),
  //     switchMap(({ payload }) =>
  //       this.postService.createComment(payload).pipe(
  //         switchMap(() => [
  //           // После создания комментария, можно запросить комментарии для этого поста
  //           commentAction.fetchComments({ postId: payload.postId })
  //         ])
  //       )
  //     )
  //   )
  // );




  // fetchcomments$ = createEffect(()=>{
  //   return this.actions$.pipe(
  //     ofType(commentAction.fetchComments),
  //     switchMap(({})=>{
  //       return this.postService.fetchPosts().pipe(
  //         map(posts => commentAction.fetchComments({comments: PostComment[]})))
  //     })
  //   )
  // })

  // etchComments$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(commentAction.fetchComments),
  //     switchMap(({ postId }) =>
  //       this.postService.getCommentsByPostId(postId).pipe(
  //         map((comments) => commentAction.setComments({ comments }))
  //       )
  //     )
  //   )
  // );




}









