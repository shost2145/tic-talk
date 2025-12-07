import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../../../../data_acess/src/lib/data_acess';
import {
  AvatarCircleComponent
} from '../../../../../common-ui/src';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
