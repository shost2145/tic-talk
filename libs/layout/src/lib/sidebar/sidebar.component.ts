import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../../../data_acess/src/lib/data_acess/profile/services/profile.service';
import { ImgUrlPipe } from '../../../../common-ui/src/lib/common-ui/pipes/img-url.pipe';
import { SvgIconComponent } from '../../../../common-ui/src/lib/common-ui/components/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    AsyncPipe,
    JsonPipe,
    RouterLink,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subcribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
    {
      label: 'Эксперименты',
      icon: 'search',
      link: 'experiments',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
