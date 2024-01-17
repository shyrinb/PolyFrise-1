import { Component, Inject } from '@angular/core';
import { MessageService } from '../message.service';
import { v4 as UUID } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private router: Router) {}
    
    dates: Dates[] = [];
    selectedDates: string[] = []; // Utilisation de string pour les identifiants UUID
    startYear!: Date;
    endYear!: Date;
    token!: string;
    categories: any;
    selectedCategories: string = ""; // Utilisation de string pour les identifiants UUID
    selectedCategoryName: string = '';
    selectedCategoryId: string | null = null;
    selectedEventIds: string[] = [];

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe((response: Category[]) => {
      this.categories = response.map(item => ({
        id: item.id,
        name: item.name,
        selected: false
      }));
    });
  }

  loadDates(): void {
    console.log("charge dates");
    // Réinitialiser les dates
    this.dates = [];
  
    // Charger les dates uniquement si une catégorie est sélectionnée
    if (this.selectedCategories.length > 0) {
      console.log("catégorie selectionne pour afficher les dates", this.selectedCategories);
      // Charger les dates depuis le service ou l'API
      this.messageService.getDataByCategory("databycategory", { categories: this.selectedCategories }).subscribe(
        (response: Dates[]) => {
          // Sélectionner la table de modèle en fonction de la catégorie
          let date_name: string = '';

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
          console.log("affiche la date des evenements ", date_name);
          this.dates = response.map(item => ({
            id: item.id,
            nom: item.nom,
            date: item[date_name],
            selected: false
          }));
          console.log("evenement de la catégorie", this.dates);

          // Mettez la logique pour traiter les dates ici
          this.processSelectedDates();
        },
        (error) => {
          console.error('Erreur lors de la récupération des dates :', error);
        }
    );
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
  

  emitData() {
    const selectedNomEvents = this.selectedDates.map(selectedDateId => {
      const selectedDate = this.dates.find(date => date.id === selectedDateId);
      return selectedDate ? selectedDate.nom : ''; // Retourne le nom si trouvé, sinon une chaîne vide
    });

    const selectedDates = this.selectedDates.map(selectedDateId => {
      const selectedDate = this.dates.find(date => date.id === selectedDateId);
      return selectedDate ? selectedDate.date : ''; // Retourne la date si trouvée, sinon une chaîne vide
    });

    console.log("this.selectedEventIds",this.selectedEventIds)
    this.dialogRef.close({ 
      categories: this.selectedCategories, 
      nom_event:selectedNomEvents.join(', '),
      date:selectedDates.join(', '),
      date_id:this.selectedDates });
  }

}