import {
  Component, computed,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import {debounceTime, firstValueFrom, fromEvent} from 'rxjs';
import { PostService } from '../../../../../data_acess/src/lib/data_acess/posts/services/post.service';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import {Store} from "@ngrx/store";
import {Post, ProfileService} from "../../../../../data_acess/src/lib/data_acess";
import {postAction, selectPosts} from "../../data/store";



@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
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




  constructor() {
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



