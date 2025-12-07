
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  Renderer2
} from '@angular/core';
import { AvatarCircleComponent } from '../../../../../../../common-ui/src';
import { Message } from '../../../../../../../data_acess/src/lib/data_acess';
import {ToMoscowTimePipe} from "../../../../../../../common-ui/src/lib/common-ui/pipes/data-pipes";




@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, ToMoscowTimePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();


  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }







}
