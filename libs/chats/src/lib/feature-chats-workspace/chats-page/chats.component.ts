import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsService } from '../../../../../data_acess/src/lib/data_acess/chats/services/chats.sertvice';
import { ChatsListComponent } from '../chats-list/chats-list.component';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent {}
