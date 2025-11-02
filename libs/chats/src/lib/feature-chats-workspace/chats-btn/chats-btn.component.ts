import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';
import { LastMessageRes } from '../../../../../data_acess/src/lib/data_acess/chats/interface/chats.interface';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
