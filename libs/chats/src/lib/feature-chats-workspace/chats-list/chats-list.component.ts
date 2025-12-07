import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {map, startWith, switchMap} from 'rxjs';
import {ChatsService} from '../../data/chats.sertvice';
import {ChatsBtnComponent} from '../chats-btn/chats-btn.component';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsListComponent {
  chatsService = inject(ChatsService);
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);


  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
              .toLowerCase()
              .includes(inputValue?.toLowerCase() ?? '');
          });
        })
      );
    })
  );

}
