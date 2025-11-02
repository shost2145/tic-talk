import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../../../../data_acess/src/lib/data_acess/profile/interface/profile.interface';
import { ProfileService } from '../../../../../data_acess/src/lib/data_acess/profile/services/profile.service';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../../../../../common-ui/src/lib/common-ui/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, NgIf, FormsModule, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  @Output() created = new EventEmitter<string>();

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}
