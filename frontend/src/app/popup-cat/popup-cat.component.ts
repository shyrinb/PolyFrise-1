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
    private fb: FormBuilder ) { }

    token!: string;
    formData: FormGroup; // Ajoutez la déclaration de formData
    categories: any;
    selectedCategories: Category[] = [];
    selectedCategoriesColumns: string[] = [];
    selectedCategoryName: string = '';
    selectedCategoryId: string | null = null;
    selectedEventId: string = '';
    dates: Dates[] = [];

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response;
    });
  }

  onEventChange(selectedEventId: string): void {
    // Mettez à jour le modèle avec l'id de l'événement sélectionné
    this.selectedEventId = selectedEventId;
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
            selected: false
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
  
    // Réinitialisez l'identifiant de l'événement sélectionné
    this.selectedEventId = '';
  
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
    for (const date of this.dates) {
      if (date.selected) {
        // Modifiez la propriété à laquelle vous souhaitez affecter la valeur
        // Par exemple, si vous avez une propriété `selectedDate`, utilisez-la
        this.selectedEventId = date.id.toString();
      }
    }
  } 

  onInput(event: any, column: string): void {
    // Ajoutez la logique nécessaire pour gérer les événements d'entrée ici
    // Vous pouvez utiliser event.target.value pour obtenir la valeur de l'entrée
    const value = event.target.value;

    // Faites quelque chose avec la valeur, par exemple, mettez à jour le formulaire
    this.formData.get(column)?.setValue(value);
  }

  submitData(): void {
    const formDataValues = this.formData.value;
  
    this.messageService.sendDataMod(this.selectedCategoryName,this.selectedEventId, formDataValues).subscribe(
      response => {
        alert("modification effectuée");
        console.log('Réponse du service :', response);
      },
      error => {
        // Gérez l'erreur ici (par exemple, affichez un message d'erreur)
        console.error('Erreur lors de la soumission des données :', error);
      }
    );
  }
}