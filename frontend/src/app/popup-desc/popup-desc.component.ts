import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupAddEventComponent } from '../popup-add-event/popup-add-event.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-popup-desc',
  templateUrl: './popup-desc.component.html',
  styleUrls: ['./popup-desc.component.css']
})
export class PopupDescComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PopupAddEventComponent>,
  private messageService: MessageService) {;
  }

  isEditMode : boolean = false

  description : string = this.data.event.description
  categories : any
  date : Date = new Date(this.data.event.date);
  title : string = this.data.event.title

  update(){
    this.isEditMode = !this.isEditMode
    if(this.isEditMode){
      this.messageService.getData("category", "").subscribe(response => {
        this.categories = response
      })
    }
  }

  updateLocal(){
    const data = {
      id : this.data.event.id,
      categories : this.categories.filter((cat : any) => cat.selected == true).map((cat : any) => {return(cat.id)}),
      title : this.title,
      description : this.description,
      date : this.date
    }
    this.dialogRef.close({action : "modify", data: data});
  }

  updateSubmission(){
    if( this.data.event.isTmp){
      return this.dialogRef.close();
    }
    const data = {
      event_id : this.data.event.id,
      categories : this.categories.filter((cat : any) => cat.selected == true).map((cat : any) => {return(cat.id)}),
      title : this.title,
      description : this.description,
      date : this.date
    }
    this.messageService.sendData("submission/modify", data).subscribe(response => {
      this.dialogRef.close();
    })
  }
  delete(){
    console.log(this.data.event)
    if( this.data.event.isTmp){
      return this.dialogRef.close();
    }
    this.messageService.sendData("submission/delete", {event_id : this.data.event.id}).subscribe(response => {
      this.dialogRef.close();
    })
  }

  deleteLocal(){
    this.dialogRef.close({action : "delete", data: this.data.event.id});
  }
}
