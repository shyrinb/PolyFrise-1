import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-generationinformatique',
  templateUrl: './generationinformatique.component.html',
  styleUrls: ['./generationinformatique.component.css']
})
export class GenerationinformatiqueComponent implements OnInit {
  geninfoData: any[];

  constructor(private geninfoService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/generationsinformatique';
    this.geninfoService.getDataOnglets(endpoint).subscribe(data => {
      this.geninfoData = data;
    });
  }
}
