import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsService } from '../../../../../data_acess/src/lib/data_acess/chats/services/chats.sertvice';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent implements OnInit {
  #chatService = inject(ChatsService);


  constructor() {

    this.#chatService.connectWS().pipe(
      takeUntilDestroyed()
    ).subscribe()
  }

  ngOnInit() {
  }


}
