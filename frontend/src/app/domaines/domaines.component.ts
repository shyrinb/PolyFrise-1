import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})
export class DomainesComponent implements OnInit {
  domainesData: any[];

  constructor(private domainesService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/domaines';
    this.domainesService.getDataOnglets(endpoint).subscribe(data => {
      this.domainesData = data;
    });
  }
}
