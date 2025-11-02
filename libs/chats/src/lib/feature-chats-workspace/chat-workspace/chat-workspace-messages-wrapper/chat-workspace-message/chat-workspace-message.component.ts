import { DatePipe } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../../../common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';
import { Message } from '../../../../../../../data_acess/src/lib/data_acess/chats/interface/chats.interface';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
