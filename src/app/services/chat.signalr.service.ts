import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, catchError, from, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatSignalrService {
  private hubConnection!: signalR.HubConnection;

  private messageReceivedSubject: Subject<ChatMessage> =
    new Subject<ChatMessage>();
  messageReceived$ = this.messageReceivedSubject.asObservable();

  private connectionEstablishedSubject: Subject<boolean> =
    new Subject<boolean>();
  connectionEstablished$ = this.connectionEstablishedSubject.asObservable();

  constructor() {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat`)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started');
        this.connectionEstablishedSubject.next(true);
        this.receiveMessage();
      })
      .catch((err) =>
        console.error('Error while starting SignalR connection: ', err)
      );
  }

  sendMessage(message: any) {
    if (
      this.hubConnection &&
      this.hubConnection.state === signalR.HubConnectionState.Connected
    ) {
      this.hubConnection
        .invoke('SendMessage', message)
        .catch((err) =>
          console.error('Error while sending chat messages: ', err)
        );
    } else {
      console.error('SignalR connection is not established.');
    }
  }

  receiveMessage() {
    if (
      this.hubConnection &&
      this.hubConnection.state === signalR.HubConnectionState.Connected
    ) {
      this.hubConnection.on('ReceiveMessage', (message) => {
        this.messageReceivedSubject.next(message);
      });
    } else {
      console.error('SignalR connection is not established.');
    }
  }

  async getChatHistory(
    senderId: string,
    receiverId: string
  ): Promise<ChatMessage[]> {
    if (
      this.hubConnection &&
      this.hubConnection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        const history = await this.hubConnection.invoke(
          'GetChatHistory',
          senderId,
          receiverId
        );
        console.log('Mapped chat history:', history);
        return history || [];
      } catch (err) {
        console.error('Error while getting chat history: ', err);
        return [];
      }
    } else {
      console.error('SignalR connection is not established.');
      return [];
    }
  }
}
