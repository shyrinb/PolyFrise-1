import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  alert = false;
  email: string = "";
  password: string = "";
  errorMessage: string="";


  constructor(private router : Router, private messageService : MessageService) { }

  onSubmit() {
  
    if (this.email == "" || this.password == ""){ // On affiche un message d'erreur 
        if (this.email == "") this.errorMessage = "Veuillez saisir votre mail";
        else this.errorMessage = "Veuillez saisir un mot de passe";
        this.alert = true;
    }

    else {
        const data = { login: this.email, password: this.password }
        const endpoint = "/connexion"; // Remplacez par l'endpoint approprié
        
        this.messageService.sendData(endpoint, data).subscribe(
            response => {
              // Traitez la réponse de la requête si nécessaire
              console.log(response);
            },
            error => {
              // Gérez les erreurs de la requête si nécessaire
              console.error(error);
            }
          );
      }
    }
}