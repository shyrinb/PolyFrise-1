import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenementshistoriques',
  templateUrl: './evenementshistoriques.component.html',
  styleUrls: ['./evenementshistoriques.component.css']
})


export class EvenementshistoriquesComponent implements OnInit {
  evenementshistoData: any[];
token!: string;
  constructor(private http: HttpClient, private router: Router,private evenementshistoService: MessageService) {}

  ngOnInit(): void { 
    const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }
    const endpoint = '/evenementshistoriques';
    this.evenementshistoService.getDataOnglets(endpoint).subscribe(data => {
      this.evenementshistoData = data;
    });
  }
logout() {
  this.evenementshistoService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}
}
