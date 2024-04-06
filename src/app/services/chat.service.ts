import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private HttpClient: HttpClient) {}

  sendMessage(receiverId: string, content: string) {
    return this.HttpClient.post(`${environment.apiUrl}/Send`, {
      receiverId,
      content,
    });
  }

  getMesssage(receiverId: string): Observable<Chat> {
    return this.HttpClient.get(
      `${environment.apiUrl}/messages?receiverId=${receiverId}`
    ).pipe(
      map((data: any) => {
        return data.map((chat: any) => {
          return {
            senderId: chat.senderId,
            senderName: chat.senderName,
            receiverId: chat.receiverId,
            receiverName: chat.receiverName,
            content: chat.content,
            timeStamp: chat.timeStamp,
          } as Chat;
        });
      })
    );
  }
}
