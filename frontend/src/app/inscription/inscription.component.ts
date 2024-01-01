import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent {
  alert = false;
  email: string = "";
  password: string = "";
  errorMessage: string="";

  constructor(private router: Router, private messageService: MessageService) { }
  
  onSubmit() {
    if (this.email == "" || this.password == "") {
      // On affiche un message d'erreur
      if (this.email == "") 
      this.errorMessage = "Veuillez saisir un nom d'utilisateur";
      else 
      this.errorMessage = "Veuillez saisir un mot de passe";
      this.alert = true;
    } else {
      const data = { login: this.email, password: this.password }
      const endpoint = "inscription"; // Remplacez par l'endpoint approprié pour l'inscription

      this.messageService.signup(data).subscribe(
        response => {
          console.log('Server Response:', response);
          this.router.navigateByUrl('/accueil');
        },
        error => {
          console.error('Error in onSubmit:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            // Gérez le cas où la propriété message n'est pas présente dans l'objet error.error
            this.errorMessage = "Une erreur inattendue s'est produite lors de l'inscription.";
          }
          
          this.alert = true;
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/connexion']);
  }
}