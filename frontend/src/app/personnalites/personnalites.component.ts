import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-personnalites',
  templateUrl: './personnalites.component.html',
  styleUrls: ['./personnalites.component.css']
})
export class PersonnalitesComponent implements OnInit {
  personnalitesData: any[];

  constructor(private personnalitesService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/personnalites';
    this.personnalitesService.getDataOnglets(endpoint).subscribe(data => {
      this.personnalitesData = data;
    });
  }
}
