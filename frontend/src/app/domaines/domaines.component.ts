import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})

export class DomainesComponent implements OnInit {
  domainesData: any[];

token!: string;

  constructor(private http: HttpClient, private router: Router,private domainesService: MessageService) {}

  ngOnInit(): void {
  const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }
    const endpoint = '/domaines';
    this.domainesService.getDataOnglets(endpoint).subscribe(data => {
      this.domainesData = data;
    });
  }
  
  logout() {
  this.domainesService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}
}
