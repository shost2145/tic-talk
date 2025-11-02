import { Component, input } from '@angular/core';
import {Profile} from "../../../../../../data_acess/src/lib/data_acess/profile/interface/profile.interface";
import {
  AvatarCircleComponent
} from "../../../../../../common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component";


@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
