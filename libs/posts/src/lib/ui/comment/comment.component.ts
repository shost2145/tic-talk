import {DatePipe} from '@angular/common';
import {Component, input} from '@angular/core';
import {
  AvatarCircleComponent
} from '../../../../../common-ui/src';
import {PostComment} from "../../../../../data-access/src";


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
