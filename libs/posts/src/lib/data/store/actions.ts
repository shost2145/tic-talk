import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Post, PostComment, PostCreateDto} from "../../../../../data-access/src";
import {CommentCreateDto} from "../../../../../data-access/src/lib/posts/interface/post.interface";



export const postAction = createActionGroup({

  source: 'Post',
  events: {
    'create post': props<{ payload: PostCreateDto }>(),
    'fetch posts': emptyProps(),
    'create post success': props<{ post: Post }>(),
    'set posts': props<{ posts: Post[] }>(), // для редьюсера
  }
})


export const commentAction = createActionGroup({

  source: 'Comment',
  events: {
    'create comments': props<{ payload: CommentCreateDto }>(),
    'fetch comments': props<{ postId: number }>(),
    'set comments': props<{ comments: PostComment[] }>(), // для редьюсера
  }
})





