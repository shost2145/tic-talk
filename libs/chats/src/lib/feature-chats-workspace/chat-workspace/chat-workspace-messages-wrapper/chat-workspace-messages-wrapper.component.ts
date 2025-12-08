import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, Renderer2} from '@angular/core';
import {debounceTime, firstValueFrom, fromEvent} from 'rxjs';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import {ChatsService} from "../../../data/chats.sertvice";
import {KeyValuePipe} from "@angular/common";
import {ChatWorkspaceMessageComponent} from "./chat-workspace-message/chat-workspace-message.component";
import {Chat, Message} from "../../../../../../data-access/src";
@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, KeyValuePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;


  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  async onSendMessage(messageText: string) {

    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText)
    );


    this.chatsService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    )

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }


  @HostListener('window:resize')
  onWindowResize() {
    this.chatFeed();
  }

  ngAfterViewInit() {
    this.chatFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
      });
  }

  chatFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }



  //  Написан вместе с нейронкой!!!
  getGroupedMessages() {
    const messagesArray = this.messages();
    const groupedMessages = new Map<string, Message[]>();

    // Текущая дата для сравнения
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    messagesArray.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const messageDay = new Date(
        messageDate.getFullYear(),
        messageDate.getMonth(),
        messageDate.getDate()
      );

      let groupKey: string;

      // Определяем ключ группы: «Сегодня», «Вчера» или форматная дата
      if (messageDay.getTime() === today.getTime()) {
        groupKey = 'Сегодня';
      } else if (messageDay.getTime() === yesterday.getTime()) {
        groupKey = 'Вчера';
      } else {
        // Форматируем дату как «дд.мм.гггг» (можно поменять формат)
        const day = messageDay.getDate().toString().padStart(2, '0');
        const month = (messageDay.getMonth() + 1).toString().padStart(2, '0');
        const year = messageDay.getFullYear();
        groupKey = `${day}.${month}.${year}`;
      }

      // Добавляем сообщение в соответствующую группу
      if (!groupedMessages.has(groupKey)) {
        groupedMessages.set(groupKey, []);
      }
      groupedMessages.get(groupKey)!.push(message);
    });

    return groupedMessages;
  }
}
