import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-accueil2',
  templateUrl: './accueil2.component.html',
  styleUrls: ['./accueil2.component.css']
})
export class Accueil2Component {
  couleur: string = '';
  couleurPersonnalise: string = '';
  forme: string = '';
  friseHistorique: any[] = [];
  selectionPersonnalisee: boolean = false;
  data:any;
  alert: boolean= false;
  errorMessage: string="";

  constructor (private router : Router){}

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
      this.data = {
        couleur: this.couleurPersonnalise,
        forme: this.forme
      };
    } else {
      this.data = {
        couleur: this.couleur,
        forme: this.forme
      };
    }

    console.log(this.data);
    this.router.navigateByUrl('/frise');
  }
}
}