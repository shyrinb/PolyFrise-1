import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as labella from 'labella';
import * as d3 from 'd3';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCatComponent } from '../popup-cat/popup-cat.component';
import { PopupDateComponent } from '../popup-date/popup-date.component';
import { PopupStyleComponent } from '../popup-style/popup-style.component';
//import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
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

  @ViewChild('friseContainer', { static: true }) friseContainer: ElementRef;

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
      const container = this.friseContainer.nativeElement;

      // Configurez les dimensions de votre frise
      const friseWidth = 1200; // La largeur initiale de la frise
      const height = 1200;

      const friseStartX = 100;
      const minStartDate = new Date('1900-01-01');
      const maxStartDate = new Date('2024-01-01');

      const dateFormatter = timeFormat('%b %Y');
      console.log("Dates avant l'affichage sur la frise:", this.timelineData.dates);
      console.log("endDate avant l'affichage sur la frise:", this.timelineData.endDate);

      console.log("startDate avant l'affichage sur la frise:", this.timelineData.startDate);

      // Étendez la plage minimale pour prendre en compte la date de début minimale des données
      const xScale = d3.scaleTime()
        .domain([minStartDate, maxStartDate])  // Utilisez une assertion de type pour spécifier explicitement le type
        .range([friseStartX, friseStartX + friseWidth]);

      // Créez l'élément SVG
        const svg = d3.select(container).append('svg')
        .attr('width', friseWidth + friseStartX)
        .attr('height', height);

        // Ajoutez le rectangle de la frise
        svg.append('rect')
        .attr('x', friseStartX) // Position de départ du rectangle
        .attr('y', height / 2 - 25) // Ajustez la position de la frise au centre de la ligne d'événement
        .attr('width', friseWidth)
        .attr('height', 30) // Ajustez la hauteur de la frise selon vos besoins
        .style('fill', 'brown');
        
        // PLAGE SELECTIONNÉE 
        const xStart = friseStartX + xScale(this.timelineData.startDate);
        const xEnd = friseStartX + xScale(this.timelineData.endDate);

        // Ajoutez le rectangle de la plage sélectionnée
        svg.append('rect')
          .attr('x', xStart) // Position de départ du rectangle
          .attr('y', height / 2 - 25) // Ajustez la position de la frise au centre de la ligne d'événement
          .attr('width', xEnd - xStart)
          .attr('height', 30) // Ajustez la hauteur de la frise selon vos besoins
          .style('fill', 'black');

        const yearFormatter = timeFormat('%Y');

         // Ajoutez le texte pour afficher la date de début PERIODE SELECTIONNE 
       svg.append('text')
       .attr('x', xStart)
       .attr('y', height / 2 - 35) // Ajustez la position du texte au-dessus de la ligne de début
       .style('text-anchor', 'middle')
       .style('font-size', '20px')
       .style('fill', 'black')
       .text(yearFormatter(this.timelineData.startDate));

     // Ajoutez le texte pour afficher la date de fin PERIODE SELECTIONNE 
     svg.append('text')
       .attr('x', xEnd)
       .attr('y', height / 2 - 35) // Ajustez la position du texte au-dessus de la ligne de début
       .style('text-anchor', 'middle') // Utilisez 'end' pour aligner le texte à droite
       .style('font-size', '20px')
       .style('fill', 'black')
       .text(yearFormatter(this.timelineData.endDate));

        // Ajoutez le texte pour afficher la date de début sur la frise
       svg.append('text')
        .attr('x', friseStartX + 20)
        .attr('y', height / 2 + 25) // Ajustez la position du texte au-dessus de la ligne de début
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(yearFormatter(minStartDate)); 

      // Ajoutez le texte pour afficher la date de fin sur la frise
      svg.append('text')
        .attr('x', friseStartX + friseWidth )
        .attr('y', height / 2 + 25) // Ajustez la position du texte au-dessus de la ligne de début
        .style('text-anchor', 'end') // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(yearFormatter(maxStartDate));

       // DATE DES EVENEMENTS
       svg.selectAll('.event-text')
        .data(this.timelineData.dates)
        .enter()
        .append('text')
        .attr('x', (date: string) => friseStartX + xScale(new Date(date))) // Ajustez la position avec le décalage de départ
        .attr('y', height / 2 + 45) // Ajustez la position du texte au-dessus de la ligne de début
        .style('text-anchor', 'middle') // ou 'end' selon vos préférences
        .style('font-size', '20px')
        .style('fill', 'black')
        .text((date: string) => dateFormatter(new Date(date)));

      // CERCLE DES DATES
      svg.selectAll('.event-circle')
        .data(this.timelineData.dates)
        .enter()
        .append('circle')
        .attr('cx', (date: string) => friseStartX + xScale(new Date(date)))
        .attr('cy',  height / 2 - 10)
        .attr('r', 15)
        .style('fill', (date: string) => this.timelineData.color);

        // NOM DES EVENEMENTS 
        svg.selectAll('.event-text')
          .data(this.timelineData.dates)
          .enter()
          .append('text')
          .attr('x', (date: string) => friseStartX + xScale(new Date(date))) // Ajustez la position avec le décalage de départ
          .attr('y', height / 2 + 65) // Ajustez la position du texte au-dessus de la ligne de début
          .style('text-anchor', 'middle') // ou 'end' selon vos préférences
          .style('font-size', '14px')
          .style('fill', 'black')
          .text((date: string, index: number) => {
              const eventName = this.timelineData.nom.split(', ')[index];; // Utilisez le nom de l'événement
              return eventName;
          });
  }       

  generateTimeline() {
    // Appel de la fonction de dessin du graphique avec les nœuds calculés par l'objet Force
    this.drawFrise();
  }
  exportTimeline() {
    switch (this.selectedFormat) {
        case 'svg':
            this.exportSVG();
            break;
        case 'png':
            this.exportPNG();
            break;
        case 'pdf':
            this.exportPDF();
            break;
        // Ajoutez d'autres cas si nécessaire (par exemple, pour le format CSV)
        default:
            // Gérer le cas par défaut ou lancer une erreur
            console.error('Format d\'exportation non pris en charge');
            break;
    }
  }

  // Fonction pour exporter au format PNG
  exportPNG() {
    const container = this.friseContainer.nativeElement;
    const svg = d3.select(container).select('svg').node() as Element; // Spécifiez le type ici

    // Convertir le SVG en données d'URL au format base64
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
        // Dessiner l'image sur le canevas
        context?.drawImage(img, 0, 0);

        // Télécharger l'image en tant que fichier PNG
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'frise.png';
        a.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  }

  // Fonction pour exporter au format PDF
  exportPDF() {
    const container = this.friseContainer.nativeElement;
    const svg = d3.select(container).select('svg').node() as Element; // Spécifiez le type ici

    // Convertir le SVG en données d'URL au format base64
    const svgData = new XMLSerializer().serializeToString(svg);

    // Créer un élément de lien (a) pour télécharger le PDF
    const a = document.createElement('a');
    a.href = 'data:application/pdf;base64,' + btoa(svgData);
    a.download = 'frise.pdf';
    a.click();
  }

  // Fonction pour exporter au format SVG
  exportSVG() {
    const container = this.friseContainer.nativeElement;
    const svg = d3.select(container).select('svg').node() as Element; // Spécifiez le type ici

    // Convertir le SVG en données d'URL au format base64
    const svgData = new XMLSerializer().serializeToString(svg);

    // Créer un élément de lien (a) pour télécharger le SVG
    const a = document.createElement('a');
    a.href = 'data:image/svg+xml;base64,' + btoa(svgData);
    a.download = 'frise.svg';
    a.click();
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