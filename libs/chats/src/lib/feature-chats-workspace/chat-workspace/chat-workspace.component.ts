import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';
import {ChatsService} from '../../data/chats.sertvice';
import {ProfileService} from '../../../../../data_acess/src/lib/data_acess';
import {
  ChatWorkspaceMessagesWrapperComponent
} from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import {ChatWorkspaceHeaderComponent} from "./chat-workspace-header/chat-workspace-header.component";

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  chatsService = inject(ChatsService);
  me = inject(ProfileService);
  activeChat$ = this.route.params.pipe(
    switchMap(({id}) => this.chatsService.getChatById(id))
  );


}
