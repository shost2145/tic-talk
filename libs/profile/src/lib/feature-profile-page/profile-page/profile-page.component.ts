import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {firstValueFrom, switchMap} from 'rxjs';
import {ProfileHeaderComponent} from '../../ui';
import {SvgIconComponent} from '../../../../../common-ui/src/lib/common-ui/components/svg-icon/svg-icon.component';
import {ChatsService} from '../../../../../chats/src/lib/data/chats.sertvice';
import {ProfileService} from '../../../../../data_acess/src/lib/data_acess';
import {ImgUrlPipe} from '../../../../../common-ui/src';
import {PostFeedComponent} from '../../../../../posts/src';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.profileService.me);
  subcriber$ = this.profileService.getSubscribersShortList(5);

  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }
}
