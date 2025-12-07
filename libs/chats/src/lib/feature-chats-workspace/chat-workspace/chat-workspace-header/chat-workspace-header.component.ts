import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from "../../../../../../data_acess/src/lib/data_acess";
import {
  AvatarCircleComponent
} from "../../../../../../common-ui/src";


@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
