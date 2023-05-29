import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../message.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-popup-add-event-admin',
  templateUrl: './popup-add-event-admin.component.html',
  styleUrls: ['./popup-add-event-admin.component.css']
})
export class PopupAddEventAdminComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupAddEventAdminComponent>,
    private messageService: MessageService) { }

  token!: string;
  description : string = ""
  categories : any
  date : Date = new Date();
  title : string = ""

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response
    })

    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }

  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  submitData() {
    const data = {
      categories : this.categories.filter((cat : any) => cat.selected == true).map((cat : any) => {return(cat.id)}),
      title : this.title,
      description : this.description,
      date : this.date
    }
    this.messageService.sendDataAuto("timeline/create", data, this.token).subscribe(response => {
      this.dialogRef.close();
    })
  }
}
