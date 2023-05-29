import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { v4 as UUID } from 'uuid';




interface Category {
  id: typeof UUID,
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],

})
export class AccueilComponent implements OnInit {
  categories: Category[]=[];
  sliderOptions: Options = {
    floor: 0,
    ceil: 2023,
    step: 1,
    minRange: 1
  };
  selectedStartYear: number=0;
  selectedEndYear: number = 2023;
  startYear!:Date;
  endYear!: Date;
  categoriesSelected: typeof UUID[] = [];
  data: any;
  alert = false;
  errorMessage: string="";


  constructor(private http: HttpClient,private router : Router, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getData("category", "").subscribe(response => {

      //const names = response['name'].map((item: Category) => item.name);
     // console.log(names);

    for (const item of response) {
      const category: Category = {
        id: item.id,
        name: item.name,
        selected: false
      };
      this.categories.push(category);
    }

    //console.log('Catégories :', this.categories);
  })
  }


  submit() {
    this.alert = false; // Réinitialiser l'alerte à false avant de vérifier la condition

    for (const category of this.categories) {
      if (category.selected) {
        this.categoriesSelected.push(category.id);
      }
    }
    if (this.selectedStartYear > this.selectedEndYear) {
      this.errorMessage = "Sélectionnez une date de début inférieure à la date de fin";
      this.alert = true;
    }
    console.log('Année début sélectionnée :', this.selectedStartYear);
    console.log('Année fin sélectionnée :', this.selectedEndYear);

    if (!this.alert) { // Vérifier la condition en utilisant "!this.alert" au lieu de "this.alert == false"
      this.startYear = new Date(this.selectedStartYear, 0, 1);
      this.endYear = new Date(this.selectedEndYear, 11, 31);
      //console.log(this.startYear);

      this.data = { categories: this.categoriesSelected, startDate: this.startYear.toISOString(), endDate: this.endYear.toISOString() };

      if (!this.alert) {
            this.router.navigateByUrl('index');
            localStorage.setItem('data', JSON.stringify(this.data));

      }

    }
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}
