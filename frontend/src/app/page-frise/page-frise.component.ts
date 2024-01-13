import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as labella from 'labella';
import * as d3 from 'd3';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCatComponent } from '../popup-cat/popup-cat.component';
import { PopupDateComponent } from '../popup-date/popup-date.component';
import { PopupStyleComponent } from '../popup-style/popup-style.component';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';
import { PopupDescComponent } from '../popup-desc/popup-desc.component';
import { PopupAddEventComponent } from '../popup-add-event/popup-add-event.component';
import { HttpClient } from '@angular/common/http';

import { timeFormat } from 'd3-time-format';

interface TimelineItem {

  event : any;
  h?: number; // Ajoutez la propriété h de type number (optionnelle)
  w?: number; // Ajoutez la propriété w de type number (optionnelle)
}
@Component({
  selector: 'app-page-frise',
  templateUrl: './page-frise.component.html',
  styleUrls: ['./page-frise.component.css'],

})

export class PageFriseComponent implements OnInit {  
  downloadFormats = {
    svg: false,
    jpeg: false,
    pdf: false
  };

  token!: string;

  selectedFormat : string ="svg";
  categories : any;
  startDate : any;
  endDate : any;
  labels: any;
  timelineItems: TimelineItem[] = []
  deletedItemTmp : any[] = []
  updatedItemTmp : TimelineItem[] = []
  timelineItemsTmp: TimelineItem[] = []

  timelineData: any; // Assurez-vous que le type correspond à la structure de vos données
  color : any ;
  shape : any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private messageService : MessageService,public dialog: MatDialog) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      this.token = token;
    }
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      const rawData = JSON.parse(params['data']);
      this.timelineData = this.processData(rawData);
      this.drawFrise();
    });
  }

  logout() {
    this.messageService.sendDataAuto("deconnexion","", this.token).subscribe();
      localStorage.removeItem("jwtToken");
      this.router.navigateByUrl('/');
  }

  formatDate(date: Date): Date {
    // Formatez la date comme vous le souhaitez, par exemple : 'YYYY-MM-DD'
    return new Date(date.getFullYear(), 0, 1); 
  }

  processData(rawData: any): any {
    console.log("AVANT FORMATAGE DE LA DATE", rawData);
  
    // Vérifiez si rawData.date est défini avant d'extraire les années
    const dates = rawData.date
      ? rawData.date.split(',').map((date: string) => new Date(date))
      : [];
  
    // Créez un nouvel objet avec les dates au format Date
    const processedData = {
      categories: rawData.categories,
      nom: rawData.nom,
      dates: dates,
      startDate: new Date(rawData.startDate),
      endDate: new Date(rawData.endDate),
      color: rawData.color,
      shape: rawData.shape
    };
  
    console.log("APRES FORMATAGE DE LA DATE", processedData);
    return processedData;
  }

  drawFrise(): void {
    const container = document.querySelector('.frise-container.my-custom-frise');


  // Configurez les dimensions de votre frise
  const friseWidth = 1200; // La largeur initiale de la frise
  const friseHeight = 1200;
  const friseHeightY = 570;
  const friseStart = 100;

  const friseStartY = 80;
  const minStartDate = new Date('1900-01-01');
  const maxStartDate = new Date('2024-01-01');

  const dateFormatter = timeFormat('%b %Y');
  console.log("Dates avant l'affichage sur la frise:", this.timelineData.dates);
  console.log("endDate avant l'affichage sur la frise:", this.timelineData.endDate);

  console.log("startDate avant l'affichage sur la frise:", this.timelineData.startDate);

  console.log("choisi",this.timelineData.shape) ;
  if (this.timelineData.shape === 'horizontale') {

  console.log("choisi horizontale");
     // Étendez la plage minimale pour prendre en compte la date de début minimale des données
      const xScale = d3.scaleTime()
      .domain([minStartDate, maxStartDate])
      .range([friseStart, friseStart + friseWidth]);

    // Créez l'élément SVG
    const svg = d3.select(container).append('svg')
      .attr('width', friseWidth + friseStart)
      .attr('height', friseHeight);

    // Ajoutez le rectangle de la frise
    svg.append('rect')
      .attr('x', friseStart) // Position de départ du rectangle
      .attr('y', friseHeight / 2 - 25) // Ajustez la position de la frise au centre de la ligne d'événement
      .attr('width', friseWidth)
      .attr('height', 30) // Ajustez la hauteur de la frise selon vos besoins
      .style('fill', 'brown');

    // PLAGE SELECTIONNÉE 
    const xStart = friseStart + xScale(this.timelineData.startDate);
    const xEnd = friseStart + xScale(this.timelineData.endDate);

    // Ajoutez le rectangle de la plage sélectionnée
    svg.append('rect')
      .attr('x', xStart)
      .attr('y', friseHeight / 2 - 25)
      .attr('width', xEnd - xStart)
      .attr('height', 30)
      .style('fill', 'black');

    const yearFormatter = timeFormat('%Y');
      // Ajoutez le texte pour afficher la date de début PERIODE SELECTIONNE 
      svg.append('text')
        .attr('x', xStart)
        .attr('y', friseHeight / 2 - 35)
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(yearFormatter(this.timelineData.startDate));

    // Ajoutez le texte pour afficher la date de fin PERIODE SELECTIONNE 
    svg.append('text')
        .attr('x', xEnd)
        .attr('y', friseHeight / 2 - 35)
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(yearFormatter(this.timelineData.endDate));

    // Ajoutez le texte pour afficher la date de début sur la frise
    svg.append('text')
        .attr('x', friseStart + 20)
        .attr('y', friseHeight / 2 + 25)
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'brown')
        .text(yearFormatter(minStartDate));

    // Ajoutez le texte pour afficher la date de fin sur la frise
    svg.append('text')
        .attr('x', friseStart + friseWidth)
        .attr('y', friseHeight / 2 + 25)
        .style('text-anchor', 'end')
        .style('font-size', '20px')
        .style('fill', 'brown')
        .text(yearFormatter(maxStartDate));

    // DATE DES EVENEMENTS
    svg.selectAll('.event-text')
        .data(this.timelineData.dates)
        .enter()
        .append('text')
        .attr('x', (date: string) => friseStart + xScale(new Date(date)))
        .attr('y', friseHeight / 2 + 45)
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'black')
        .text((date: string) => dateFormatter(new Date(date)));

    // CERCLE DES DATES
    svg.selectAll('.event-circle')
        .data(this.timelineData.dates)
        .enter()
        .append('circle')
        .attr('cx', (date: string) => friseStart + xScale(new Date(date)))
        .attr('cy', friseHeight / 2 - 10)
        .attr('r', 15)
        .style('fill', (date: string) => this.timelineData.color);

    // NOM DES EVENEMENTS 
    svg.selectAll('.event-text')
        .data(this.timelineData.dates)
        .enter()
        .append('text')
        .attr('x', (date: string) => friseStart + xScale(new Date(date)))
        .attr('y', friseHeight / 2 + 65)
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', 'black')
        .text((date: string, index: number) => {
            const eventName = this.timelineData.nom.split(', ')[index];
            return eventName;
        });
} else if (this.timelineData.shape === 'verticale') {
  console.log("choisi verticale");
  //-------// Étendez la plage minimale pour prendre en compte la date de début minimale des données
    const yScale = d3.scaleTime()
    .domain([minStartDate, maxStartDate])
    .range([friseStartY, friseStartY + friseHeightY]);

    // Créez l'élément SVG
    const svg = d3.select(container).append('svg')
    .attr('width', friseWidth)
    .attr('height', friseHeightY + friseStartY);

    // Ajoutez le rectangle de la frise
    svg.append('rect')
    .attr('x', friseWidth / 2 - 15)  // Ajustez la position de la frise au centre de la ligne d'événement
    .attr('y', friseStartY)
    .attr('width', 30)  // Ajustez la largeur de la frise selon vos besoins
    .attr('height', friseHeightY)
    .style('fill', 'brown');

    // PLAGE SELECTIONNÉE 
    const yStart = friseStartY + yScale(this.timelineData.startDate);
    const yEnd = friseStartY + yScale(this.timelineData.endDate);

     // Ajoutez le rectangle de la plage sélectionnée
     svg.append('rect')
     .attr('x', friseHeight / 2 - 15)  // Ajustez la position de la plage sélectionnée au centre de la ligne d'événement
     .attr('y', yStart)
     .attr('width', 30)  // Ajustez la largeur de la plage sélectionnée selon vos besoins
     .attr('height', yEnd - yStart)
     .style('fill', 'black');
   

    const yearFormatter = timeFormat('%Y');
    // Ajoutez le texte pour afficher la date de début PERIODE SELECTIONNE 
    svg.append('text')
        .attr('x', friseHeight / 2 + 55)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', yStart+10)
        .style('text-anchor', 'middle')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(yearFormatter(this.timelineData.startDate));

    // Ajoutez le texte pour afficher la date de fin PERIODE SELECTIONNE 
    svg.append('text')
        .attr('x', friseHeight / 2 + 55)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', yEnd-10)
        .style('text-anchor', 'middle')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(yearFormatter(this.timelineData.endDate));

    // Ajoutez le texte pour afficher la date de début sur la frise
    svg.append('text')
        .attr('x', friseHeight / 2 + 25)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', friseStartY - 10)
        .style('text-anchor', 'start')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '20px')
        .style('fill', 'brown')
        .text(yearFormatter(minStartDate));

    // Ajoutez le texte pour afficher la date de fin sur la frise
    svg.append('text')
        .attr('x', friseHeight / 2 + 25)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', friseStartY + friseHeightY -10)
        .style('text-anchor', 'start')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '20px')
        .style('fill', 'brown')
        .text(yearFormatter(maxStartDate));

    // DATE DES EVENEMENTS
    svg.selectAll('.event-text')
        .data(this.timelineData.dates)
        .enter()
        .append('text')
        .attr('x', friseHeight / 2 -20)  // Ajustez la position avec le décalage de départ
        .attr('y', (date: string) => yScale(new Date(date)))
        .style('text-anchor', 'end')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '20px')
        .style('fill', 'black')
        .text((date: string) => dateFormatter(new Date(date)));

    // CERCLE DES DATES
    svg.selectAll('.event-circle')
        .data(this.timelineData.dates)
        .enter()
        .append('circle')
        .attr('cx', friseHeight / 2)  // Ajustez la position avec le décalage de départ
        .attr('cy', (date: string) => yScale(new Date(date)))
        .attr('r', 15)
        .style('fill', (date: string) => this.timelineData.color);

    // NOM DES EVENEMENTS 
    svg.selectAll('.event-text')
        .data(this.timelineData.dates)
        .enter()
        .append('text')
        .attr('x', friseHeight / 2 -120)  // Ajustez la position avec le décalage de départ
        .attr('y', (date: string) => yScale(new Date(date)))
        .style('text-anchor', 'end')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '14px')
        .style('fill', 'black')
        .text((date: string, index: number) => {
            const eventName = this.timelineData.nom.split(', ')[index];
            return eventName;
        });
      }

   }

   generateTimeline():void {
    this.drawFrise()
   };

  exportTimeline() {
    
    const container = document.querySelector('.frise-container.my-custom-frise');
    const svgElement = container.querySelector('svg');

    switch (this.selectedFormat) {
      case 'svg':
        this.exportSVG(svgElement)
        break;
      case 'png':
        this.exportPNG(svgElement)
        break;
      case 'pdf':
        this.exportPDF(svgElement)
        break;
      default:
        this.exportSVG(svgElement)
        break;
    }
  }

  exportSVG(svgElement : any){
    console.log("choisi svg");
    if (!svgElement) {
      console.error("L'élément SVG est null ou non défini");
      return;
    }

    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);

      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'timeline.svg';
      link.click();

      window.URL.revokeObjectURL(url);
    }
  }

  exportPNG(svgElement : any){

    console.log("choisi png");
    if (svgElement) {
      domtoimage.toBlob(svgElement)
        .then((blob: Blob) => {
          saveAs(blob, 'timeline.png');
        });
    }

  }

  exportPDF(svgElement : any){

    console.log("choisi pdf");
    if (svgElement) {
      domtoimage.toPng(svgElement)
        .then((dataUrl: string) => {
          const pdf = new jsPDF();
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (svgElement.clientHeight * imgWidth) / svgElement.clientWidth;

          pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('timeline.pdf');
        });
    }
  }

  changeCategories() {
    const dialogRef = this.dialog.open(PopupCatComponent, {
      width: '50%',
      height: 'auto',
      data: { cats : this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        const dataTimeline = {
          categories : result,
          startDate : this.startDate,
          endDate : this.endDate
        }

        this.categories = result

        this.messageService.sendData("timeline", dataTimeline).subscribe(
          response => {
            this.timelineItems = response.map((e: any) => {
              e.date = new Date(e.date); // Conversion de la chaîne de date en objet Date
              return {
                event: e
              };
            });
            this.generateTimeline();

        })
      }
    });
  }
  

  changeDates() {
    const dialogRef = this.dialog.open(PopupDateComponent, {
      width: '50%',
      height: 'auto',
      data: { startDate : this.startDate, endDate : this.endDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.startDate = new Date(result.startDate)
        this.endDate = new Date(result.endDate)

        const dataTimeline = {
          categories : this.categories,
          startDate : this.startDate,
          endDate : this.endDate
        }

        this.messageService.sendData("timeline", dataTimeline).subscribe(
          response => {
            this.timelineItems = response.map((e: any) => {
              e.date = new Date(e.date); // Conversion de la chaîne de date en objet Date
              return {
                event: e
              };
            });
            this.generateTimeline();

        })
      }
    });
  }

  changeTimelineStyle() {
    const dialogRef = this.dialog.open(PopupStyleComponent, {
      width: '50%',
      height: 'auto',
      data: { color : this.color }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.color = result.color

        const dataTimeline = {
          categories : this.categories,
          startDate : this.startDate,
          endDate : this.endDate
        }

        this.messageService.sendData("timeline", dataTimeline).subscribe(
          response => {
            this.timelineItems = response.map((e: any) => {
              e.date = new Date(e.date); // Conversion de la chaîne de date en objet Date
              return {
                event: e
              };
            });
            this.generateTimeline();

        })
      }
    });
  }

  addEvent() {
    const dialogRef = this.dialog.open(PopupAddEventComponent, {
      width: '50%',
      height: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)
        this.timelineItemsTmp.push({event : result})
        this.generateTimeline();
      }
    });
  }

  eventClicked = (event: any) => {
    event.preventDefault();
      const dialogRef = this.dialog.open(PopupDescComponent, {
        width: '50%',
        height: 'auto',
        data: { event : event.target.__data__.data.event }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.action == "delete"){
          this.deletedItemTmp.push(result.data)
          this.generateTimeline();
        }
        if(result.action == "modify"){
          const index = this.updatedItemTmp.findIndex(element => element.event.id === result.data.id);
          if (index !== -1) {
            this.updatedItemTmp.splice(index, 1);
          }
          this.updatedItemTmp.push({event : result.data})
          this.generateTimeline();
        }
      }
    });
  }
}