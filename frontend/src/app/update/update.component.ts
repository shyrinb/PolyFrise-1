import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  token!: string;
  events: any[] = [
    { nom: 'Événement 1', date: '2023-05-30', lieu: 'Lieu 1' },
    { nom: 'Événement 2', date: '2023-06-01', lieu: 'Lieu 2' },
    { nom: 'Événement 3', date: '2023-06-05', lieu: 'Lieu 3' }
  ];



  constructor( private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }
  }
  editEvent(event: any) {
    // Logique pour modifier l'événement
  }

  deleteEvent(event: any) {
    // Logique pour supprimer l'événement
  }

  addEvent() {
    // Logique pour ajouter un nouvel événement
  }
  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/admin');
    
  }

  home(){
    this.router.navigateByUrl('/admin/submission');
  }
}




