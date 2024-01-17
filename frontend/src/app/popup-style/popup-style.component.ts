import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupCatComponent } from '../popup-cat/popup-cat.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-popup-style',
  templateUrl: './popup-style.component.html',
  styleUrls: ['./popup-style.component.css']
})
export class PopupStyleComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupCatComponent>,
    private messageService: MessageService) { }

  color: string = "";
  shape: string = "";

  ngOnInit(): void {
    if (["#0000FF", "#FF0000", "#008000", "#FFFF00"].includes(this.data.color)) {
      this.color = this.data.color;
    }
    if (["horizontale", "verticale"].includes(this.data.shape)) {
      this.shape = this.data.shape;
    }
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  emitData() {
    this.dialogRef.close({ color: this.color, shape:this.shape});
  }

}
