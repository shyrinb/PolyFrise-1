import { Component, OnInit } from '@angular/core';
import { v4 as UUID } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

interface Submission {
  id: typeof UUID,
  type: string;
  dateSub: string;
  title: string;
  description: string;
  date: string;
  selected: boolean;

}

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
  suggestions: any[] = [];
  suggestionsSelected: any= [];
  token!: string;
  errorMessage: string="";
  alert = false;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }

    this.messageService.getSubmissions().subscribe(response => {
      this.suggestions = response.map(item => {
        return {
          id: item.id,
          type: item.submission_type,
          dateSub: new Date(item.timestamp).toLocaleDateString(),
          autheur: item.submitted_by,
          description: item.submission_data, // Ajoutez le champ correct ici
          selected: false
        };
      });
    });
  }

  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');
  }

  validate() {

    for (const item of this.suggestions) {
      if(item.selected==true){
        this.suggestionsSelected.push(item.id);
      }
    }
    if (this.suggestionsSelected.length > 0) {
      const data = { ids: this.suggestionsSelected };
      this.messageService.sendDataAuto("submission/accept", data, this.token).subscribe(() => {
        // Rafraîchir la page après l'envoi du message
        window.location.reload();
      })
    }

    else{
      this.errorMessage="Merci de saisir des modifications avant de valider";
      this.alert=true;
    }
  }


  ignore() {
    for (const item of this.suggestions) {
      if(item.selected==true){
        this.suggestionsSelected.push(item.id);
      }
    }
    if (this.suggestionsSelected.length > 0) {
      const data = { ids: this.suggestionsSelected };
      this.messageService.sendDataAuto("submission/reject", data, this.token).subscribe(() => {
        // Rafraîchir la page après l'envoi du message
        window.location.reload();
      })
    }

    else{
      this.errorMessage="Merci de saisir des modifications avant de cliquer sur Ignorer";
      this.alert=true;
    }
  }


  getBackgroundColor(type: string): string {
    switch (type) {
      case 'UPDATE':
        return 'suggestion-update';
      case 'CREATE':
        return 'suggestion-create';
      case 'DELETE':
        return 'suggestion-delete';
      default:
        return '';
    }
  }
}
