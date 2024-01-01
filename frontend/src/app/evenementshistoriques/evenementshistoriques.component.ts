import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-evenementshistoriques',
  templateUrl: './evenementshistoriques.component.html',
  styleUrls: ['./evenementshistoriques.component.css']
})
export class EvenementshistoriquesComponent implements OnInit {
  evenementshistoData: any[];

  constructor(private evenementshistoService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/evenementshistoriques';
    this.evenementshistoService.getDataOnglets(endpoint).subscribe(data => {
      this.evenementshistoData = data;
    });
  }

}
