import { Component } from '@angular/core';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Logex test application';
  
  msgs: Message[] = [];

}
