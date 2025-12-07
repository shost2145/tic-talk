import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../sidebar';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ChatsService} from "../../../../chats/src/lib/data/chats.sertvice";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  #chatService = inject(ChatsService);


  constructor() {
    this.#chatService.connectWS().pipe(
      takeUntilDestroyed()
    ).subscribe()
  }


}

