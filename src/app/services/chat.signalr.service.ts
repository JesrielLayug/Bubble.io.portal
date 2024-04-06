import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatSignalrService {
  private hubConnection!: signalR.HubConnection;
  private receivedMessageSource = new Subject<any>();
  receivedMessage$ = this.receivedMessageSource.asObservable();

  constructor() {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('chathub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) => console.log('Error: ' + err));

    this.hubConnection.on(
      'RecieveMessage',
      (senderId: string, receiverId: string, content: string) => {
        this.receivedMessageSource.next({ senderId, receiverId, content });
      }
    );
  }
}
