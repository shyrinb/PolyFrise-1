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
  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }
    this.messageService.userStatus$.subscribe(userStatus => {
      this.userStatus = userStatus;
    });
  }

  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');
  }
}