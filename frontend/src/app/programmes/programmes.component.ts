import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})


export class ProgrammesComponent implements OnInit {
    programmesData: any[];
  
token!: string;
    constructor(private http: HttpClient, private router: Router,private programmesService: MessageService) {}
  
    ngOnInit(): void { 
      const token = localStorage.getItem('jwtToken');
      if (token !== null) {
        this.token = token;
      }
      const endpoint = '/programmes';
      this.programmesService.getDataOnglets(endpoint).subscribe(data => {
        this.programmesData = data;
      });
    }
    logout() {
      this.programmesService.sendDataAuto("deconnexion","", this.token).subscribe();
        localStorage.removeItem("jwtToken");
        this.router.navigateByUrl('/');
    
    }
}