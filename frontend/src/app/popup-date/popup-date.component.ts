import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupCatComponent } from '../popup-cat/popup-cat.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-popup-date',
  templateUrl: './popup-date.component.html',
  styleUrls: ['./popup-date.component.css']
})
export class PopupDateComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupCatComponent>,
    private messageService: MessageService) { }


  formData: any = {}; // Modèle pour les données du formulaire
  startDate : number = 1850;
  endDate : number = 2024;

  ngOnInit(): void {
      this.startDate = new Date(this.data.startDate).getFullYear();
      this.endDate = new Date(this.data.endDate).getFullYear();
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  emitData() {
    this.dialogRef.close({startDate: new Date(this.startDate, 0, 1),endDate: new Date(this.endDate, 11, 31)});
  }

}
