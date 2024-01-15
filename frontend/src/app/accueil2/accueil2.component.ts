import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Options } from 'ng5-slider';

interface Category {
  id: string,
  name: string;
  selected: boolean;
}

interface Dates {
  id: string,
  nom: string;
  date: string; 
  selected: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-accueil2',
  templateUrl: './accueil2.component.html',
  styleUrls: ['./accueil2.component.css']
})


export class Accueil2Component implements OnInit{
 
  constructor (private router : Router, private http: HttpClient,private messageService: MessageService){}
  categories: Category[] = [];
  dates: Dates[] = [];
  selectedCategories: string = ""; // Utilisation de string pour les identifiants UUID
  selectedDates: string[] = []; // Utilisation de string pour les identifiants UUID
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
  categoriesSelected: string[] = []; // Utilisation de string pour les identifiants UUID
  data: any;
  alert = false;
  errorMessage: string = "";

  ngOnInit() {
    this.messageService.getData("category", "").subscribe((response: Category[]) => {
      this.categories = response.map(item => ({
        id: item.id,
        name: item.name,
        selected: false
      }));
    });
  }

  // Fonction appelée lorsqu'une catégorie est sélectionnée
  onCategorySelected() {
    // Réinitialiser les dates
    this.dates = [];

    // Charger les dates uniquement si une catégorie est sélectionnée
    if (this.selectedCategories.length > 0) {
      // Charger les dates depuis le service ou l'API
      this.messageService.getDataByCategory("databycategory", { categories: this.selectedCategories }).subscribe((response: Dates[]) => {

        // Sélectionner la table de modèle en fonction de la catégorie
        let date_name: string;
        switch (this.selectedCategories) {
          case 'avancees':
            date_name = 'date_avancee';
            break;
          case 'personnalites':
            date_name = 'date_naissance';
            break;
          case 'programmes':
            date_name = 'date_creation';
            break;
          case 'entreprises':
            date_name = 'fondation';
            break;
          case 'evenements_historiques':
            date_name = 'date_evenement';
            break;
          case 'evenements_informatiques':
            date_name = 'annee';
            break;
          case 'domaines':
            date_name = 'date_creation';
            break;
          case 'distinctions':
            date_name = 'creation';
            break;
          case 'generations_informatiques':
            date_name = 'annee_debut';
            break;
          default:
            console.error('Catégorie non valide');
            return;
        }
      //  faire un switch pour en fonction de la categorie selectionne recupere la date qui a un nom différent 
        this.dates = response.map(item => ({
          id: item.id,
          nom: item.nom,
          date: item[date_name],
          selected: false
        }));

          // Mettez la logique pour traiter les dates ici
          this.processSelectedDates();
      },
      (error) => {
        console.error('Erreur lors de la récupération des dates :', error);
      });
    }
  }

  
  submit() {
    this.alert = false;
  
    for (const category of this.categories) {
      if (category.selected) {
        this.selectedCategories = category.id.toString();
      }
    }
  
    if (this.selectedStartYear > this.selectedEndYear) {
      this.errorMessage = "Sélectionnez une date de début inférieure à la date de fin";
      this.alert = true;
    }
  
    if (!this.alert) {
      this.startYear = new Date(this.selectedStartYear, 0, 1);
      this.endYear = new Date(this.selectedEndYear, 11, 31);

      const selectedNomEvents = this.selectedDates.map(selectedDateId => {
        const selectedDate = this.dates.find(date => date.id === selectedDateId);
        return selectedDate ? selectedDate.nom : ''; // Retourne le nom si trouvé, sinon une chaîne vide
      });

      const selectedDates = this.selectedDates.map(selectedDateId => {
        const selectedDate = this.dates.find(date => date.id === selectedDateId);
        return selectedDate ? selectedDate.date : ''; // Retourne la date si trouvée, sinon une chaîne vide
      });
    
      this.data = {
        categories: this.selectedCategories,
        nom_event: selectedNomEvents.join(', '), // Utilisez la variable directement
        date: selectedDates.join(', '),
        date_id: this.selectedDates,
        startDate: this.startYear.toString(),
        endDate: this.endYear.toISOString()
      };
      console.log("data",this.data);
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
        this.selectedCategories = date.id.toString();
      }
    }
  }  

  formatLabel(value: number): string {
    return `${value}`;
  }

}
