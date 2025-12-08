import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject, OnInit,
  Renderer2,
} from '@angular/core';
import {debounceTime, fromEvent} from 'rxjs';
import {PostInputComponent} from '../../ui/post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {Store} from "@ngrx/store";
import {postAction, selectPosts} from "../../data/store";
import {PostService} from "../../../../../data-access/src/lib/posts/services/post.service";
import {ProfileService} from "../../../../../data-access/src";



@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeedComponent implements OnInit {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  store = inject(Store)
  //feed = this.postService.posts;                                      //работает без NGRX
  feed = this.store.selectSignal(selectPosts)  //работает через NGRX


  profile = inject(ProfileService).me;

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }


  ngOnInit() {
    //firstValueFrom(this.postService.fetchPosts());  //работает без NGRX
    this.store.dispatch(postAction.fetchPosts());//работает через NGRX

  }


  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
      });
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }


}



