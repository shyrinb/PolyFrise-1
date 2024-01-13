import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnalites',
  templateUrl: './personnalites.component.html',
  styleUrls: ['./personnalites.component.css']
})

export class PersonnalitesComponent implements OnInit {
  personnalitesData: any[];

token!: string;
  constructor(private http: HttpClient, private router: Router, private personnalitesService: MessageService) {}

  ngOnInit(): void {
  const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }
    const endpoint = '/personnalites';
    this.personnalitesService.getDataOnglets(endpoint).subscribe(data => {
      this.personnalitesData = data;
    });
  }
  
  logout() {
  this.personnalitesService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}
}
