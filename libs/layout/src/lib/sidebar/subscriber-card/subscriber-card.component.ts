import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Profile} from '../../../../../data_acess/src/lib/data_acess';
import {ImgUrlPipe} from '../../../../../common-ui/src';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
