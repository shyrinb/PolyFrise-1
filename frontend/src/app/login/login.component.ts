import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { tap } from 'rxjs';

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
  userStatus: any;
  userName: any;
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
            const token = response.token;
            console.log(token);
            localStorage.setItem('jwtToken', token);
            this.messageService.getUserInfo().subscribe(
              (userInfo: any) => {
                this.userStatus = userInfo.status;
                this.userName= userInfo.login;
              },
              error => {
                console.log(error);
              }
            );
            this.messageService.sendDataUser(response);
            this.messageService.sendDataUserName(response);
            this.router.navigateByUrl('/accueil');
          },
          error => {
            console.log(error);
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = "Une erreur inattendue s'est produite lors de l'inscription.";
            }
            this.alert = true;
          }
        );
      }
    }

    handleLoginError(error: any) {
      console.log(error);
      if (error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = "Une erreur inattendue s'est produite lors de l'inscription.";
      }
      this.alert = true;
    }
    
    handleUserInfoError(error: any) {
      console.log(error);
      // Gérer les erreurs liées à la récupération des informations utilisateur
    }
    
  goToInscription() {
      this.router.navigate(['/inscription']);
  }
}
