import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


interface Category {
  id: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'popup-app-add-event',
  templateUrl: './popup-add-event.component.html',
  styleUrls: ['./popup-add-event.component.css']
})

export class PopupAddEventComponent implements OnInit {
  token!: string;
  categories: any;
  selectedCategories: Category[] = [];
  selectedCategoryId: string | null = null;
  selectedCategoriesColumns: string[] = [];
  formData: FormGroup;
  selectedCategoryName: string = '';
  constructor(private router: Router, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response;
    });
    this.initializeForm();
  }

  logout() {
    this.messageService.sendDataAuto("deconnexion", "", this.token).subscribe();
    localStorage.removeItem("jwtToken");
    this.router.navigateByUrl('/');
  }

  onInput(event: Event, column: string): void {
    const target = event.target as HTMLInputElement;
    this.formData.get(column)?.setValue(target.value);
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  initializeForm(): void {
    const formGroupConfig: any = {};
  
    // Excluez la colonne 'id' du formulaire
    this.selectedCategoriesColumns.filter(column => column !== 'id').forEach(column => {
      formGroupConfig[column] = [''];  // Vous pouvez ajouter des validations ici si nécessaire
    });
  
    this.formData = this.fb.group(formGroupConfig);
  }

  onCategoryChange(selectedCategoryId: string): void {
    // Décochez toutes les autres catégories lorsqu'une nouvelle est sélectionnée
    this.categories.forEach((category: Category) => {
      category.selected = category.id === selectedCategoryId;
    });

    // Mettez à jour le modèle avec l'id de la catégorie sélectionnée
    this.selectedCategoryId = selectedCategoryId;
    this.selectedCategories = this.getSelectedCategories();
     // Appel pour récupérer les colonnes de la catégorie sélectionnée
     if (this.selectedCategories.length > 0) {
      const categoryName = this.selectedCategories[0].name;
      this.selectedCategoryName = categoryName;
      console.log("categorie selectionne", this.selectedCategoryName);
      this.messageService.getChampByCategorie(categoryName).subscribe(columns => {
        // Excluez la colonne 'id' de la liste des colonnes
        this.selectedCategoriesColumns = columns.filter(column => column !== 'id');
        this.initializeForm();  // Initialiser le formulaire lorsque vous avez les colonnes
      });
    }
  }

  getSelectedCategories(): Category[] {
    return this.categories.filter((cat: Category) => cat.selected);
  }

  submitData(): void {
    // Obtenez les valeurs du formulaire
    const formDataValues = this.formData.value;
  
    console.log("valeur du formulaire", formDataValues);
    // Envoyez les données au backend
    this.messageService.sendDataAdd(this.selectedCategoryName, formDataValues).subscribe(
      response => {
        alert('Evènement ajoutés');
        console.log('Données ajoutées avec succès', response);
        // Fermez manuellement la boîte de dialogue après le traitement
      },
      error => {
        console.error('Erreur lors de l\'ajout de données', error);
        // Gérez les erreurs éventuelles
      }
    );
  }

}