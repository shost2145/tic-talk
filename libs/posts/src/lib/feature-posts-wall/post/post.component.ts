import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input, OnInit, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {
  AvatarCircleComponent
} from '../../../../../common-ui/src';
import {SvgIconComponent} from '../../../../../common-ui/src/lib/common-ui/components/svg-icon/svg-icon.component';
import {CommentComponent} from '../../ui/comment/comment.component';
import {PostInputComponent} from "../../ui/post-input/post-input.component";
import {Store} from "@ngrx/store";
import {Post, PostComment} from "../../../../../data-access/src";
import {PostService} from "../../../../../data-access/src/lib/posts/services/post.service";


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    CommentComponent,
    PostInputComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post = input<Post>();
  store = inject(Store)
  comments = signal<PostComment[]>([]);


  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    this.comments.set(comments);
  }
}

