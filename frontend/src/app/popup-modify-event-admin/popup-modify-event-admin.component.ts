import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../message.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-popup-modify-event-admin',
  templateUrl: './popup-modify-event-admin.component.html',
  styleUrls: ['./popup-modify-event-admin.component.css']
})

export class PopupModifyEventAdminComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupModifyEventAdminComponent>,
              private messageService: MessageService,
              ){;
  }

  description : string = this.data.event.description
  categories : any
  date : Date = new Date(this.data.event.date);
  title : string = this.data.event.title
  token!: string;

  ngOnInit(): void {
    console.log(this.data);
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response;
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
      id: this.data.event.id,
      categories : this.categories.filter((cat : any) => cat.selected == true).map((cat : any) => {return(cat.id)}),
      title : this.title,
      description : this.description,
      date : this.date
    }

    this.messageService.sendDataAuto("timeline/modify", data, this.token).subscribe(response => {
      this.dialogRef.close();
    })
  }
}
