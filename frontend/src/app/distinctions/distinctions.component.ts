import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distinctions',
  templateUrl: './distinctions.component.html',
  styleUrls: ['./distinctions.component.css']
})


export class DistinctionsComponent implements OnInit {
  distinctionsData: any[];

token!: string;
  constructor(private http: HttpClient, private router: Router, private distinctionsService: MessageService) {}

  ngOnInit(): void {
  const token = localStorage.getItem('jwtToken');
  if (token !== null) {
    this.token = token;
  }

    const endpoint = '/distinctions';
    this.distinctionsService.getDataOnglets(endpoint).subscribe(data => {
      this.distinctionsData = data;
    });
  }
  logout() {
  this.distinctionsService.sendDataAuto("deconnexion","", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');

}
}
