import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {Profile} from '../../../../../data_acess/src/lib/data_acess';
import {ImgUrlPipe} from '../../../../../common-ui/src';
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {ChatsService} from "../../../../../chats/src/lib/data/chats.sertvice";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],

  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() profile!: Profile;

  router = inject(Router);
  chatsService = inject(ChatsService);

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }


}
