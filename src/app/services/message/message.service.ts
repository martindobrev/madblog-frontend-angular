import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Subject<string> = new Subject();

  messages$ = this.messages.asObservable();

  constructor() { 
    
    let source = new EventSource('/messages/sse');
    source.onmessage = (message: any) => {
      console.log('Message received: ', message.data);
      this.messages.next(message.data);
    };
  /*
    source.addEventListener('message', (message: any) => {
      console.log('Message received: ', message.data);
      this.messages.next(message.data);
    });
*/
    source.addEventListener('error', (error: any) => {
      console.log('Something went wrong: ', error);
    });
  }
}
