import {AsyncPipe, NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../../../common-ui/src';
import {SvgIconComponent} from '../../../../common-ui/src/lib/common-ui/components/svg-icon/svg-icon.component';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {ChatsService} from "../../../../chats/src/lib/data/chats.sertvice";
import {ProfileService} from "../../../../data-access/src";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    AsyncPipe,
    RouterLink,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  subcribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;
  chatsService = inject(ChatsService);
  unreadMessages = this.chatsService.unreadMessages;


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
      icon: 'flask',
      link: 'experiments',
    },

    {
      label: 'Домашняя работа',
      icon: 'homework',
      link: 'Homework'}



  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());


  }
}
