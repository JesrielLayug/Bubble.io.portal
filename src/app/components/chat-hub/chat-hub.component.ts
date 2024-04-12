import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatSignalrService } from '../../services/chat.signalr.service';
import { Chat } from '../../models/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, filter, pipe, take } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import { ChatRequest } from '../../models/chatRequest';
import { ChatMessage } from '../../models/chat-message';

@Component({
  selector: 'app-chat-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-hub.component.html',
  styleUrl: './chat-hub.component.css',
})
export class ChatHubComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  receiverId: string = '';
  senderId: string = '';

  private messageSubscription!: Subscription;

  constructor(
    private chatSignalrService: ChatSignalrService,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    // Start SignalR connection
    this.chatSignalrService.startConnection();

    // Get the Sender Id
    await this.initializeSenderId();

    // Get Receiver Id and Chat History when connection is established
    this.chatSignalrService.connectionEstablished$
      .pipe(
        filter((established) => established),
        take(1)
      )
      .subscribe(() => {
        this.route.paramMap.subscribe((params) => {
          this.receiverId = params.get('id') || '';
          this.getChatHistory();
        });
      });

    this.messageSubscription =
      this.chatSignalrService.messageReceived$.subscribe((msg) => {
        this.messages.push(msg);
      });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message: ChatMessage = {
        id: '',
        content: this.newMessage,
        timeStamp: new Date(),
        senderId: this.senderId,
        receiverId: this.receiverId,
      };
      this.chatSignalrService.sendMessage(message);
      this.newMessage = '';
    }
  }

  async getChatHistory() {
    try {
      const history = await this.chatSignalrService.getChatHistory(
        this.senderId,
        this.receiverId
      );
      this.messages = history;
    } catch (err) {
      console.error('Error while getting chat history: ', err);
      // Handle error appropriately, e.g., show a message to the user
    }
  }

  async initializeSenderId(): Promise<void> {
    const userObservable = await this.profileService.get();

    const user = await userObservable.toPromise();

    if (user) {
      this.senderId = user.id;
    } else {
      console.error('User data is undefined.');
      return;
    }
  }

  // async ngOnInit(): Promise<void> {
  //   await this.initializeSenderId();
  //   this.subscribeToRouteParams();
  //   console.log(this.chats);
  // }

  // ngOnDestroy(): void {
  //   this.unsubscribeRouteParams();
  // }

  // async initializeSenderId(): Promise<void> {
  //   const userObservable = await this.profileService.get();

  //   const user = await userObservable.toPromise();

  //   if (user) {
  //     this.senderId = user.id;
  //   } else {
  //     console.error('User data is undefined.');
  //     return;
  //   }
  // }

  // private subscribeToRouteParams(): void {
  //   this.routeSubscription = this.route.params.subscribe((params) => {
  //     this.receiverId = params['id'];
  //     this.signalrService.startConnection();
  //     this.signalrService.getChatHistory(this.senderId, this.receiverId);
  //     this.signalrService.chatHistory$.subscribe((chatHistories: any[]) => {
  //       this.chats = chatHistories as Chat[];
  //     });
  //   });
  // }

  // private unsubscribeRouteParams(): void {
  //   if (this.routeSubscription) {
  //     this.routeSubscription.unsubscribe();
  //   }
  // }

  // sendMessage(message: string): void {
  //   if (message.trim() === '') return;
  //   // this.signalrService.sendMessage(this.senderId, this.receiverId, message);
  // }
}
