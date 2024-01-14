import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pagefriseparam2',
  templateUrl: './pagefriseparam2.component.html',
  styleUrls: ['./pagefriseparam2.component.css']
})
export class Pagefriseparam2Component {
  couleur: string = '';
  couleurPersonnalise: string = '';
  forme: string = '';
  friseHistorique: any[] = [];
  selectionPersonnalisee: boolean = false;
  data:any;
  alert: boolean= false;
  errorMessage: string="";
  infoChoix: any;
  constructor (private router : Router, private messageService: MessageService){}
  
  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('data') || '{}');
  }
  toggleSelection() {
    this.selectionPersonnalisee = !this.selectionPersonnalisee;
  }

  submit(){
    this.alert==false;

    if(this.alert==false){
    if (this.selectionPersonnalisee) {
      this.infoChoix = {
        couleur: this.couleurPersonnalise,
        forme: this.forme
      };
    } else {
      this.infoChoix = {
        couleur: this.couleur,
        forme: this.forme
      };
    }

    const startDate = new Date(this.data.startDate);
    const endDate = new Date(this.data.endDate);

    const data = {
      categories : this.data.categories,
      nom : this.data.nom_event,
      date : this.data.date,
      startDate : startDate,
      endDate : endDate,
      color : this.couleur == "personnalise" ? this.couleurPersonnalise : this.couleur,
      shape : this.forme
    }

    this.router.navigate(['/timeline'], { queryParams: { data: JSON.stringify(data) } });
    console.log('Données envoyées au backend :', this.data);
  }

  }
  toggleSelectionOff() {
    this.selectionPersonnalisee = false;
  }
}
