import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avancees',
  templateUrl: './avancees.component.html',
  styleUrls: ['./avancees.component.css']
})  

export class AvanceesComponent implements OnInit {
  avanceesData: any[];
token!: string;

  constructor(private http: HttpClient, private router: Router,private avanceesService: MessageService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }

    const endpoint = '/avancees';
    this.avanceesService.getDataOnglets(endpoint).subscribe(data => {
      this.avanceesData = data;
    });
  }
  logout() {
    this.avanceesService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');

  }

}