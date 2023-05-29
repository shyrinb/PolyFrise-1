import { Component, Inject } from '@angular/core';
import { MessageService } from '../message.service';
import { v4 as UUID } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface Category {
  id: typeof UUID,
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-popup-cat',
  templateUrl: './popup-cat.component.html',
  styleUrls: ['./popup-cat.component.css']
})
export class PopupCatComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupCatComponent>,
    private messageService: MessageService) { }


  formData: any = {}; // Modèle pour les données du formulaire
  categories: Category[] = [];

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response.map((cat : any) => {
        return({
            id: cat.id,
            name: cat.name,
            selected: this.data.cats.some((ca : any) => cat.id === ca)
          })
        })
    })

  }

  emitData() {
    this.dialogRef.close(this.categories.filter((cat) => cat.selected == true).map((cat : any) => {return(cat.id)}));
  }

}
