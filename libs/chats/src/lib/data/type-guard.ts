import {ChatWSNewMessage, ChatWsUnreadMessage} from "libs/data_acess/src/lib/data_acess";
import {ChatWSMessage} from "../../../../data_acess/src/lib/data_acess";


export function isUnreadMessage(message: ChatWSMessage): message is ChatWsUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message';
}
