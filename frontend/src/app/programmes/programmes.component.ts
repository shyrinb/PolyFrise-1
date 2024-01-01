import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {
    programmesData: any[];
  
    constructor(private programmesService: MessageService) {}
  
    ngOnInit(): void {
      const endpoint = '/programmes';
      this.programmesService.getDataOnglets(endpoint).subscribe(data => {
        this.programmesData = data;
      });
    }
}