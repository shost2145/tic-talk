import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Chat, LastMessageRes, Message } from '../interface/chats.interface';
import { ProfileService } from '../../profile/services';
import {ChatWsService} from "../../../../../../chats/src/lib/data/chat-ws-service.interface";
import {AuthService} from "../../auth/services/auth.service";
import {ChatWSMessage, ChatWsUnreadMessage} from "../../../../../../chats/src/lib/data/chat-ws-message.interface";
import {isNewMessage, isUnreadMessage} from "../../../../../../chats/src/lib/data/type-guard";
import {ChatWsRxjsService} from "../../../../../../chats/src/lib/data/chat-ws-rxjs.service";


@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  #authService = inject(AuthService);

  wsAdapter: ChatWsService = new ChatWsRxjsService()

  activeChatMessages = signal<Message[]>([]);
  unreadMessages = signal<number>(0);


  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;


  connectWS(){
   return  this.wsAdapter.connect({
        url: `${this.baseApiUrl}chat/ws`,
        token: this.#authService.token?? '',
      handleMessage: this.handleWSMessage
    }) as Observable<ChatWSMessage>;
  }




  handleWSMessage = (message: ChatWSMessage)=>{
    console.log(message);
    if (!('action' in message)) return

     if (isUnreadMessage(message)){
       if(message.action === 'unread'){let countChat = message.data.count
         this.unreadMessages.set(countChat)}
       console.log('есть не прочитанные сообщения')}


    if (isNewMessage(message)) {
  this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        }
      ])}
  }


  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
