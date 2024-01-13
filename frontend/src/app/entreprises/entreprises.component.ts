import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})


export class EntreprisesComponent implements OnInit {
  entreprisesData: any[];
token!: string;
  messageService: any;
  constructor(private http: HttpClient, private router: Router,private entreprisesService: MessageService) {}

  ngOnInit(): void { 
  const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }
    const endpoint = '/entreprises';
    this.entreprisesService.getDataOnglets(endpoint).subscribe(data => {
      this.entreprisesData = data;
    });
  }
  logout() {
  this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}

}