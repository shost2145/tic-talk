import {ChatConnectionWSParams, ChatWsService} from "./chat-ws-service.interface";

export class ChatWsNativeServiceService implements ChatWsService {

  #socket: WebSocket | null = null;

  connect(params: ChatConnectionWSParams){
    if(this.#socket) return

    this.#socket = new WebSocket(params.url, [params.token]);

    this.#socket.onmessage = (event) => {
      params.handleMessage(JSON.parse(event.data));
    }
this.#socket.onclose = () => {
      console.log('А что тут твориться? А?')
}
  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId
      })
    )


  }

  disconnect(){
this.#socket?.close()
  }
}
