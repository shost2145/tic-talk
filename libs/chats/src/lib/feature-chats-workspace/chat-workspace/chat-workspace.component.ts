import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { MessageInputComponent } from '../../ui/message-input/message-input.component';
import { ChatsService } from '../../../../../data_acess/src/lib/data_acess/chats/services/chats.sertvice';
import { ProfileService } from '../../../../../data_acess/src/lib/data_acess/profile/services/profile.service';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import {ChatWorkspaceHeaderComponent} from "./chat-workspace-header/chat-workspace-header.component";

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  chatsService = inject(ChatsService);
  me = inject(ProfileService);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => this.chatsService.getChatById(id))
  );
}
