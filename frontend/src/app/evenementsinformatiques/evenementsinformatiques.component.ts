import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-evenementsinformatiques',
  templateUrl: './evenementsinformatiques.component.html',
  styleUrls: ['./evenementsinformatiques.component.css']
})
export class EvenementsinformatiquesComponent implements OnInit {
  evenementsinfoData: any[];

  constructor(private evenementsinfoService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/evenementsinformatiques';
    this.evenementsinfoService.getDataOnglets(endpoint).subscribe(data => {
      this.evenementsinfoData = data;
    });
  }
}
