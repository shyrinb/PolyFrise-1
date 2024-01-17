import { Component, Inject } from '@angular/core';
import { MessageService } from '../message.service';
import { v4 as UUID } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Category {
  id: typeof UUID,
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
  selector: 'app-popup-cat',
  templateUrl: './popup-cat.component.html',
  styleUrls: ['./popup-cat.component.css']
})
export class PopupCatComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupCatComponent>,
    private messageService: MessageService, 
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder ) { {
      this.formData = this.fb.group({});
    }}

    token!: string;
    formData: FormGroup; // Ajoutez la déclaration de formData
    categories: any;
    selectedCategories: Category[] = [];
    selectedDates: string[] = []; 
    selectedCategoryName: string = '';
    selectedCategoryId: string | null = null;
    selectedEventIds: string[] = [];
    dates: Dates[] = [];

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response;
    });
  }

  onEventChange(selectedEventId: string): void {
    // Mettez à jour la liste des événements sélectionnés en fonction de l'état de la case à cocher ou du bouton radio
    const index = this.selectedEventIds.indexOf(selectedEventId);
    if (index === -1) {
      this.selectedEventIds.push(selectedEventId);
    } else {
      this.selectedEventIds.splice(index, 1);
    }
  }

  getSelectedCategories(): Category[] {
    return this.categories.filter((cat: Category) => cat.selected);
  }

  private loadDates(): void {
    console.log("charge dates");
    // Réinitialiser les dates
    this.dates = [];

    // Charger les dates uniquement si une catégorie est sélectionnée
    if (this.selectedCategories.length > 0) {
      console.log("catégorie selectionne pour afficher les dates", this.selectedCategoryName);
      // Charger les dates depuis le service ou l'API
      this.messageService.getDataByCategory("databycategory", { categories: this.selectedCategoryName }).subscribe(
        (response: Dates[]) => {
          // Sélectionner la table de modèle en fonction de la catégorie
          let date_name: string = '';

          switch (this.selectedCategories[0].name) {
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
          console.log("affiche la date des evenements ", date_name);
          this.dates = response.map(item => ({
            id: item.id,
            nom: item.nom,
            date: item[date_name],
            selected: this.selectedEventIds.includes(item.id.toString()) // Vérifiez si l'événement est dans la liste des sélectionnés
          }));
          console.log("evenement de la catégorie",this.dates);
         
          // Mettez la logique pour traiter les dates ici
          this.processSelectedDates();
        },
        (error) => {
          console.error('Erreur lors de la récupération des dates :', error);
        }
      );
    }
  }

  onCategoryChange(selectedCategoryId: string): void {
    // Décochez toutes les autres catégories lorsqu'une nouvelle est sélectionnée
    this.categories.forEach((category: Category) => {
      category.selected = category.id.toString() === selectedCategoryId;
    });
  
    // Réinitialisez la liste des identifiants d'événements sélectionnés
    this.selectedEventIds = [];
  
    // Mettez à jour le modèle avec l'id de la catégorie sélectionnée
    this.selectedCategoryId = selectedCategoryId;
    this.selectedCategories = this.getSelectedCategories();

    if (this.selectedCategories.length > 0) {
      const categoryName = this.selectedCategories[0].name;
      this.selectedCategoryName = categoryName;
      console.log("categorie selectionne", this.selectedCategoryName);

      // Chargez les dates
      this.loadDates();

      console.log("affiche les colonnes");

    }
  }

  private processSelectedDates() {
    // Mettez la logique pour traiter les dates ici
    this.selectedEventIds = this.dates.filter(date => date.selected).map(date => date.id.toString());
  }
  

  onInput(event: any, column: string): void {
    // Ajoutez la logique nécessaire pour gérer les événements d'entrée ici
    // Vous pouvez utiliser event.target.value pour obtenir la valeur de l'entrée
    const value = event.target.value;

    // Faites quelque chose avec la valeur, par exemple, mettez à jour le formulaire
    this.formData.get(column)?.setValue(value);
  }

  emitData() {
    console.log("this.selectedEventIds",this.selectedEventIds)
    this.dialogRef.close({ categories: this.selectedCategoryName, event:this.selectedEventIds});
  }

}