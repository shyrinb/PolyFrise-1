import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})

export class EntreprisesComponent implements OnInit {
  entreprisesData: any[];

  constructor(private entreprisesService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/entreprises';
    this.entreprisesService.getDataOnglets(endpoint).subscribe(data => {
      this.entreprisesData = data;
    });
  }

}