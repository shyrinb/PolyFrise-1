import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenementsinformatiques',
  templateUrl: './evenementsinformatiques.component.html',
  styleUrls: ['./evenementsinformatiques.component.css']
})

export class EvenementsinformatiquesComponent implements OnInit {
  evenementsinfoData: any[];
token!: string;
  constructor(private http: HttpClient, private router: Router,private evenementsinfoService: MessageService) {}

  ngOnInit(): void {
    
  const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }
    const endpoint = '/evenementsinformatiques';
    this.evenementsinfoService.getDataOnglets(endpoint).subscribe(data => {
      this.evenementsinfoData = data;
    });
  }
  
  logout() {
  this.evenementsinfoService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}
}
