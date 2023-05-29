import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../message.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-popup-add-event',
  templateUrl: './popup-add-event.component.html',
  styleUrls: ['./popup-add-event.component.css']
})
export class PopupAddEventComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupAddEventComponent>,
    private messageService: MessageService) { }

  description : string = ""
  categories : any
  date : Date = new Date();
  title : string = ""

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response
    })

  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  emitData() {
    const data = {
      id : uuidv4(),
      isTmp : true,
      categories : this.categories.filter((cat : any) => cat.selected == true).map((cat : any) => {return(cat.id)}),
      title : this.title,
      description : this.description,
      date : this.date
    }
    this.dialogRef.close(data);

  }

  submitData() {
    const data = {
      categories : this.categories.filter((cat : any) => cat.selected == true).map((cat : any) => {return(cat.id)}),
      title : this.title,
      description : this.description,
      date : this.date
    }
    this.messageService.sendData("submission/create", data).subscribe(response => {
      this.dialogRef.close();
    })
  }

}
