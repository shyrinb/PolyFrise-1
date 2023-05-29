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
  events: any[] = [];
  searchValue: string = "";
  displayedColumns: string[] = ['category', 'date', 'title', 'description','action'];


  constructor( private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }

    console.log("test")
    this.messageService.sendData("timeline/getAll", "").subscribe(res => {
      console.log(res);
      this.events = res;
      this.events.forEach((event:any) => {
        console.log(event)
        if (event.categories[0]) event.categories = event.categories[0].name
        else event.categories = "CATEGORIE INCONNUE"

        event.date = new Date (event.date).toLocaleDateString()
      })
    })
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

  search() {
    this.messageService.sendDataAuto("timeline/getSearch", {searchValue: this.searchValue}, this.token).subscribe(res => {
      console.log(res);
      this.events = res;
      this.events.forEach((event: any) => {
        console.log(event)
        if (event.categories[0]) event.categories = event.categories[0].name
        else event.categories = "CATEGORIE INCONNUE"

        event.date = new Date(event.date).toLocaleDateString()
      })
    })
  }

}




