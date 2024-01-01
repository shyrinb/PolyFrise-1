import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-avancees',
  templateUrl: './avancees.component.html',
  styleUrls: ['./avancees.component.css']
})

export class AvanceesComponent implements OnInit {
  avanceesData: any[];

  constructor(private avanceesService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/avancees';
    this.avanceesService.getDataOnglets(endpoint).subscribe(data => {
      this.avanceesData = data;
    });
  }

}