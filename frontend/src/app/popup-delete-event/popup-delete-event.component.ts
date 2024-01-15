import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-popup-delete-event',
  templateUrl: './popup-delete-event.component.html',
  styleUrls: ['./popup-delete-event.component.css']
})
export class PopupDeleteEventComponent {
  token!: string;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {}
  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');
  }
}
