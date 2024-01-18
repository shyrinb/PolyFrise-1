import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Polyfrise';
  userName:any;

  constructor(private messageService: MessageService) {}

  ngOnInit():void {
    this.messageService.getUserName().subscribe(userName => {
      this.userName = userName;
    });
  }
}
