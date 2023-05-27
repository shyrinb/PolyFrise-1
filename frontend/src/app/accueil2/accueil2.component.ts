import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'app-accueil2',
  templateUrl: './accueil2.component.html',
  styleUrls: ['./accueil2.component.css']
})

export class Accueil2Component implements OnInit{
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

    console.log(this.data);
  }
  toggleSelection() {
    this.selectionPersonnalisee = !this.selectionPersonnalisee;
  }
  validerCouleur() {
    // Utilisez la couleur personnalisée sélectionnée
    console.log(this.couleurPersonnalise);//renvoi le code HEX
  }

  submit(){
    this.alert==false;
    if (!((this.selectionPersonnalisee &&this.forme)||(this.couleur &&this.forme))){
      this.errorMessage = "Sélectionnez une couleur et l'orientation de la frise";
      this.alert = true;
    }
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

    this.messageService.sendData("timeline", this.data).subscribe(
      response => {
        console.log(this.data);
        this.router.navigateByUrl('/frise');
    })
  }
}
}