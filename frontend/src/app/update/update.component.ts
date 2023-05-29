import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { PopupAddEventAdminComponent } from '../popup-add-event-admin/popup-add-event-admin.component';

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


  constructor( private router: Router, private messageService: MessageService, public dialog: MatDialog) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }
    this.messageService.sendData("timeline/getAll", "").subscribe(res => {
      this.events = res;
      this.events.forEach((event:any) => {
        if (event.categories[0]) event.categories = event.categories[0].name
        else event.categories = "CATEGORIE INCONNUE"

        event.date = new Date (event.date).toLocaleDateString()
      })

      console.log(this.events)
    })
  }
  editEvent(event: any) {
    // Logique pour modifier l'événement
  }

  deleteEvent(event: any) {
    // Logique pour supprimer l'événement
    this.messageService.sendDataAuto("timeline/delete", {event_ID: event.id}, this.token).subscribe(res => {
      console.log("ta mere")
    })
  }

  addEvent() {
    const dialogRef = this.dialog.open(PopupAddEventAdminComponent, {
      width: '50%',
      height: 'auto',
    });
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




