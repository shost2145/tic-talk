import { Component, input } from '@angular/core';
import { Profile } from '../../../../../data_acess/src/lib/data_acess/profile/interface/profile.interface';
import { ImgUrlPipe } from '../../../../../common-ui/src/lib/common-ui/pipes/img-url.pipe';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
