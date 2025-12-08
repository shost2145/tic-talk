import { AuthService } from "./lib/auth/services/auth.service"
import {ChatWSError, ChatWSMessage, ChatWSMessageBase, ChatWSNewMessage, ChatWSSendMessage, ChatWsUnreadMessage } from "./lib/chats/interface/chat-ws-message.interface"
import { ChatConnectionWSParams, ChatWsService } from "./lib/chats/interface/chat-ws-service.interface"
import { Chat, LastMessageRes, Message} from "./lib/chats/interface/chats.interface"
import { ChatWsRxjsService } from "./lib/chats/services/chat-ws-rxjs.service"
import { DadataSuggestion } from "./lib/common-ui/interface/dadata.interface"
import { DadataService } from "./lib/common-ui/services/dadata.service"
import {Post, PostComment, PostCreateDto } from "./lib/posts/interface/post.interface"
import { Profile } from "./lib/profile/interface"
import { ProfileService } from "./lib/profile/services"
import { GlobalStoreService } from "./lib/store/services/global-store.service"


export { AuthService, ProfileService, GlobalStoreService, Profile, DadataService, ChatConnectionWSParams, ChatWsService };
export { ChatWSMessageBase, ChatWsUnreadMessage, ChatWSNewMessage, ChatWSError, ChatWSSendMessage, PostCreateDto, Post, PostComment, DadataSuggestion, ChatWSMessage, ChatWsRxjsService, Chat, Message, LastMessageRes };


