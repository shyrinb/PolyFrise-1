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

interface Dates {
  id: typeof UUID,
  nom: string;
  selected: boolean;
}
@Component({
  selector: 'app-pagefriseparam1date',
  templateUrl: './pagefriseparam1date.component.html',
  styleUrls: ['./pagefriseparam1date.component.css']
})
export class Pagefriseparam1dateComponent implements OnInit {
    categories: Category[] = [];
    dates: Dates[] = [];
    selectedCategories: typeof UUID[] = [];
    selectedDates: typeof UUID[] = [];
    sliderOptions: Options = {
      floor: 0,
      ceil: 2023,
      step: 1,
      minRange: 1
    };
    selectedStartYear: number = 0;
    selectedEndYear: number = 2023;
    startYear!: Date;
    endYear!: Date;
    categoriesSelected: typeof UUID[] = [];
    data: any;
    alert = false;
    errorMessage: string = "";
  
    constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { }
  
    ngOnInit() {
      this.messageService.getData("category", "").subscribe((response: Category[]) => {
        this.categories = response.map(item => ({
          id: item.id,
          name: item.name,
          selected: false
        }));
      });
    }
  
    submit() {
      this.alert = false;
    
      for (const category of this.categories) {
        if (category.selected) {
          this.selectedCategories.push(category.id);
        }
      }
    
      // Charger les dates uniquement si des catégories sont sélectionnées
      if (this.selectedCategories.length > 0) {
        // Charger les dates depuis le service ou l'API
        this.messageService.getData("databycategory", "").subscribe(
          (response: Dates[]) => {
            console.log('Dates récupérées du service :', response);
            this.dates = response.map(item => ({
              id: item.id,
              nom: item.nom,
              selected: false
            }));
    
            // Mettez la logique pour traiter les dates ici
            this.processSelectedDates();
          },
          (error) => {
            console.error('Erreur lors de la récupération des dates :', error);
          });
      }
    
      if (this.selectedStartYear > this.selectedEndYear) {
        this.errorMessage = "Sélectionnez une date de début inférieure à la date de fin";
        this.alert = true;
      }
    
      if (!this.alert) {
        this.startYear = new Date(this.selectedStartYear, 0, 1);
        this.endYear = new Date(this.selectedEndYear, 11, 31);
    
        this.data = {
          categories: this.selectedCategories,
          dates: this.selectedDates,
          startDate: this.startYear.toISOString(),
          endDate: this.endYear.toISOString()
        };
    
        console.log('Données envoyées au backend :', this.data);
        // Envoyez les données correctes dans la requête
        this.http.post('http://localhost:3000/api/databycategory', this.data).subscribe(
          (response) => {
            // Traitement de la réponse du backend
            console.log('Réponse du backend :', response);
          },
          (error) => {
            // Gestion des erreurs
            console.error('Erreur HTTP :', error);
          });
    
        console.log('Après la requête HTTP');
    
        if (!this.alert) {
          this.router.navigateByUrl('friseparam2');
          localStorage.setItem('data', JSON.stringify(this.data));
        }
      }
    }
    
    private processSelectedDates() {
      // Mettez la logique pour traiter les dates ici
      for (const date of this.dates) {
        if (date.selected) {
          this.selectedDates.push(date.id);
        }
      }
    }  
  
    formatLabel(value: number): string {
      return `${value}`;
    }
  }
