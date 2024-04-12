import { ChatContent } from './chatContent';
import { Profile } from './profile';

export interface Chat {
  sender: Profile;
  receiver: Profile;
  chats: ChatContent[];
}
