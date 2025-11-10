
 import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Post} from "../../../../../data_acess/src/lib/data_acess";
 import {
  CommentCreateDto, PostComment,
  PostCreateDto
} from "../../../../../data_acess/src/lib/data_acess/posts/interface/post.interface";


export const postAction = createActionGroup({

  source: 'Post',
  events: {
    'create post':props<{payload:PostCreateDto}>(),
    'fetch posts':emptyProps(),
    'set posts':props<{posts:Post[]}>(), // для редьюсера
  }
})


 export const commentAction = createActionGroup({

   source: 'Comment',
   events: {
     'create comments':props<{payload: CommentCreateDto}>(),
     'fetch comments':props<{postId: number}>(),
     'set comments':props<{comments: PostComment[]}>(), // для редьюсера
   }
 })





 // import {createActionGroup, props} from '@ngrx/store';
 // import {Post} from "../../../../../data_acess/src/lib/data_acess";
 // import {PostComment, PostCreateDto} from "../../../../../data_acess/src/lib/data_acess/posts/interface/post.interface";
 //
 // export const postActions=createActionGroup({
 // source:'Post',
 // events: {
 //   'posts loaded':props<{posts:Post[]}>(),
 //   'fetch posts':props<{page?:number}>(),
 //   'create post':props<{payload: PostCreateDto}>(),
 //   'create comment':props<{comment:PostComment[]}>(),
 //   'set comments': props<{ postId: number, comments: PostComment[] }>(),
 //
 // }
 // })A
