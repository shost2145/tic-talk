import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Post} from "../../../../../data_acess/src/lib/data_acess";
import {
  CommentCreateDto, PostComment,
  PostCreateDto
} from "../../../../../data_acess/src/lib/data_acess/posts/interface/post.interface";


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





