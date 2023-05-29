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

  selectionPersonnalisee: boolean = false;
  color : string = "";
  colorPerso : string = "";

  ngOnInit(): void {

      if(["#0000FF","#FF0000","#008000","#000000"].includes(this.data.color)) this.color = this.data.color;
      else  {
        this.color = "personnalise"
        this.colorPerso = this.data.color
        this.toggleSelection()
      }
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  toggleSelection() {
    console.log("test")
    this.selectionPersonnalisee = true;
  }

  toggleSelectionOff() {
    console.log(this.color)
    this.selectionPersonnalisee = false;
  }

  emitData() {
    console.log(this.color)

    if(this.color == "personnalise") this.color = this.colorPerso
    this.dialogRef.close({color: this.color});
  }

}
