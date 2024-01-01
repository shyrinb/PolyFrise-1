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

  constructor(private router: Router, private messageService: MessageService) { }
  
  onSubmit() {

    if (this.email == "" || this.password == ""){ // On affiche un message d'erreur
        if (this.email == "") this.errorMessage = "Veuillez saisir votre nom d'utilisateur";
        else this.errorMessage = "Veuillez saisir votre mot de passe";
        this.alert = true;
    }

    else {
        const data = { login: this.email, password: this.password }
        const endpoint = "connexion"; // Remplacez par l'endpoint approprié

        this.messageService.login(data).subscribe(
          (response: any) => {
            // Use 'any' type to bypass TypeScript checks
            const token = response.token;
            console.log(token);
            localStorage.setItem('jwtToken', token);
            this.router.navigateByUrl('/accueil');
          },
            error => {
              console.log(error);
              if (error.error && error.error.message) {
                this.errorMessage = error.error.message;
              } else {
                // Gérez le cas où la propriété message n'est pas présente dans l'objet error.error
                this.errorMessage = "Une erreur inattendue s'est produite lors de l'inscription.";
              }
              this.alert=true
            }
          );
      }
    }

  goToInscription() {
      this.router.navigate(['/inscription']);
  }
}
