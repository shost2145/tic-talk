import { Component, Input } from '@angular/core';
import { Profile } from '../../../../../data_acess/src/lib/data_acess/profile/interface/profile.interface';
import { ImgUrlPipe } from '../../../../../common-ui/src/lib/common-ui/pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
