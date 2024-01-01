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
  selector: 'app-pagefriseparam1',
  templateUrl: './pagefriseparam1.component.html',
  styleUrls: ['./pagefriseparam1.component.css']
})

export class Pagefriseparam1Component implements OnInit {
  categories: Category[] = [];
  selectedCategories: typeof UUID[] = [];
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

    if (this.selectedStartYear > this.selectedEndYear) {
      this.errorMessage = "Sélectionnez une date de début inférieure à la date de fin";
      this.alert = true;
    }

    if (!this.alert) {
      this.startYear = new Date(this.selectedStartYear, 0, 1);
      this.endYear = new Date(this.selectedEndYear, 11, 31);

      this.data = {
        categories: this.categoriesSelected,
        startDate: this.startYear.toISOString(),
        endDate: this.endYear.toISOString()
      };

      if (!this.alert) {
        this.router.navigateByUrl('friseparam2');
        localStorage.setItem('data', JSON.stringify(this.data));
      }
    }
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}
