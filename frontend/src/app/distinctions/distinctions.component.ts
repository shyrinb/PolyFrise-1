import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-distinctions',
  templateUrl: './distinctions.component.html',
  styleUrls: ['./distinctions.component.css']
})
export class DistinctionsComponent implements OnInit {
  distinctionsData: any[];

  constructor(private distinctionsService: MessageService) {}

  ngOnInit(): void {
    const endpoint = '/distinctions';
    this.distinctionsService.getDataOnglets(endpoint).subscribe(data => {
      this.distinctionsData = data;
    });
  }
}
