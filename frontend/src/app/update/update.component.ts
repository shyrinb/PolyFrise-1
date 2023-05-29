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
    { category: 'Événement 1', date: new Date(), title: 'Lieu 1', description: 'Lieu 1'  },
    { category: 'Événement 2', date: new Date(), title: 'Lieu 2', description: 'Lieu 1'  },
    { category: 'Événement 3', date: new Date(), title: 'Lieu 3', description: 'Lieu 1'  }
  ];
  displayedColumns: string[] = ['category', 'date', 'title', 'description','action'];


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

  search(){

  }
}




