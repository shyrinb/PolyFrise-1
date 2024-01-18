import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {
  token!: string;
  userStatus:any;
  userName:any;
  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }
    this.messageService.getUserStatus().subscribe(userStatus => {
      this.userStatus = userStatus;
    });
    this.messageService.getUserName().subscribe(userName => {
      this.userName = userName;
    });
  }

  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');
  }

  goToSuggestion(){
    this.router.navigateByUrl('/suggestion');
  }
}