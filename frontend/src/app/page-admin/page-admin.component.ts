import { Component, OnInit } from '@angular/core';
import { v4 as UUID } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Router } from '@angular/router'; 

interface Submission {
  id: typeof UUID,
  type: string;
  date: Date;
  title: string;
  description: string;
}

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})


export class PageAdminComponent implements OnInit {

  suggestions: Submission[] = [];
  
  constructor(private http: HttpClient,private router : Router, private messageService: MessageService) { }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
  //todo s'occuper du probleme de non autorisation( mais le token est bien récupérer)
  // Vérifiez si le token existe
  if (token) {
    // Créez les en-têtes de la requête avec le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.messageService.getData("submission", { headers }).subscribe(response => {
      console.log(response);
      console.log(response[0]); // recup element
  })  }
 else {
  // Gérez le cas où le token n'est pas disponible
  console.log('Le token JWT n\'est pas disponible.');
 }

}


  logout() {
    // Logique de déconnexion
  }

  validate() {
    // Logique de validation
  }

  ignore() {
    // Logique d'ignorance
  }

  manageHistoricalEvents() {
    // Logique de gestion des événements historiques
  }
}
