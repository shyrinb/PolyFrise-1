import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Category {
  id: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-page-sugg',
  templateUrl: './page-sugg.component.html',
  styleUrls: ['./page-sugg.component.css']
})
export class PageSuggComponent {

  token!: string;
  categories: any;
  userStatus:any;
  userName:any;
  selectedCategories: Category[] = [];
  selectedCategoryId: string | null = null;
  selectedCategoriesColumns: string[] = [];
  formData: FormGroup;
  selectedCategoryName: string = '';
  selectedValue: string = '';
  buttonText: string = 'Soumettre';
  constructor(private router: Router, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.messageService.getData("category", "").subscribe(response => {
      this.categories = response;
    });
    this.messageService.userName$.subscribe(userName => {
      this.userName= userName;

    console.log('username sugg:', this.userName);
    });

    console.log('username:',this.userName);
    this.initializeForm();
  }

  updateButtonText(): void {
    if (this.selectedValue === 'creer') {
      this.buttonText = 'Soumettre Création';
    } else if (this.selectedValue === 'modifier') {
      this.buttonText = 'Soumettre Modification';
    } else if (this.selectedValue === 'supprimer') {
      this.buttonText = 'Soumettre Suppression';
    } else {
      this.buttonText = 'Soumettre';
    }
  }

  onValueChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement | null)?.value;
    
    if (typeof selectedValue === 'string') {
      this.selectedValue = selectedValue;
      console.log("selected value", this.selectedValue)
      this.updateButtonText();
    }
  }

  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');
  }


  onInput(event: Event, column: string): void {
    const target = event.target as HTMLInputElement;
    
    // Vérifiez si selectedValue est défini avant d'accéder à sa propriété value
    if (this.formData.get('selectedValue')) {
        this.formData.get(column)?.setValue(target.value);
    }
  }


  initializeForm(): void {
    const formGroupConfig: any = {
      selectedValue: [''],  // Ajoutez le contrôle 'selectedValue'
    };
  
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

    const formDataValues = this.formData.value;
    console.log("valeur du formulaire", formDataValues);
      const submissionData = {
        submission_data: formDataValues,
        submission_type: formDataValues.selectedValue,
        timestamp: new Date(),
        submitted_by: this.userName,
        category: this.selectedCategoryId  // Ajoutez la catégorie sélectionnée ici
      };
  
      this.messageService.sendDataSugg(submissionData).subscribe(
        response => {
          console.log('Evènement ajoutés');
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
