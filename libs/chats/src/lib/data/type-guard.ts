import {ChatWSMessage, ChatWSNewMessage, ChatWsUnreadMessage} from "../../../../data-access/src";


export function isUnreadMessage(message: ChatWSMessage): message is ChatWsUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message';
}
