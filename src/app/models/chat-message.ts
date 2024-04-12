export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timeStamp: Date;
}
