import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generationinformatique',
  templateUrl: './generationinformatique.component.html',
  styleUrls: ['./generationinformatique.component.css']
})

export class GenerationinformatiqueComponent implements OnInit {
  geninfoData: any[];

token!: string;
  constructor(private http: HttpClient, private router: Router,private geninfoService: MessageService) {}

  ngOnInit(): void {
  const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }
    const endpoint = '/generationsinformatique';
    this.geninfoService.getDataOnglets(endpoint).subscribe(data => {
      this.geninfoData = data;
    });
  }
  logout() {
  this.geninfoService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}
}
