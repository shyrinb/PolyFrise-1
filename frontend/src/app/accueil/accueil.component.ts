import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Options } from 'ng5-slider';

interface Category {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  categories: Category[]=[];
  sliderOptions: Options = {
    floor: 0,
    ceil: 2023,
    step: 1,
    minRange: 1
  };
  selectedStartYear: number = 0;
  selectedEndYear: number = 2023;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getData("category", "").subscribe(response => {
      console.log(response);
      console.log(response[0]); // recup element
      
      //const names = response['name'].map((item: Category) => item.name);
     // console.log(names);

    for (const item of response) {
      console.log(item);
      const category: Category = {
        name: item.name,
        selected: false
      };
      console.log(category);
      this.categories.push(category);
    }

    console.log('Catégories :', this.categories);
  })
  }

  submit() {
    console.log('Catégories sélectionnées :');
    for (const category of this.categories) {
      if (category.selected) {
        console.log(category.name);
      }
    }
    console.log('Année début sélectionnée :', this.selectedStartYear);
    console.log('Année fin sélectionnée :', this.selectedEndYear);
  }
}
