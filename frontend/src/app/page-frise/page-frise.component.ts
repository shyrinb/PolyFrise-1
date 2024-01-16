import {  Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';

import { MatDialog } from '@angular/material/dialog';
import { PopupCatComponent } from '../popup-cat/popup-cat.component';
import { PopupDateComponent } from '../popup-date/popup-date.component';
import { PopupStyleComponent } from '../popup-style/popup-style.component';
import { HttpClient } from '@angular/common/http';
import { timeFormat } from 'd3-time-format'; // Assurez-vous que le chemin est correct
import * as d3 from 'd3'; // Assurez-vous que le chemin est correct
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as canvg from 'canvg';
import * as html2pdf from 'html2pdf.js';

interface TimelineItem {

  event : any;
  h?: number; // Ajoutez la propriété h de type number (optionnelle)
  w?: number; 
  // Ajoutez la propriété w de type number (optionnelle)
}
@Component({
  selector: 'app-page-frise',
  templateUrl: './page-frise.component.html',
  styleUrls: ['./page-frise.component.css']
})

export class PageFriseComponent implements OnInit{
  downloadFormats = {
    svg: false,
    png: false,
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
  private shape: string = ''; 
  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute, private messageService : MessageService,public dialog: MatDialog) {}

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
    // Stockez la valeur de shape
    this.shape = rawData.shape;
  
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
    console.log("drawfrise");
    const container = document.querySelector('.frise-container.my-custom-frise');
    // Vérifiez si le conteneur existe
    if (container) {
      container.innerHTML = ''; // Effacez le contenu existant
      // Le reste de votre code pour dessiner la frise...
    } else {
      console.error("Le conteneur de la frise n'a pas été trouvé dans le DOM.");
    }
  // Configurez les dimensions de votre frise
  const friseWidth = 1200; // La largeur initiale de la frise
  const friseHeight = 1200;
  const friseHeightY = 500;
  const friseStart = 100;

  const friseStartY = 80;
  const minStartDate = new Date('1850-01-01');
  const maxStartDate = new Date('2024-01-01');

  // Formatez les dates pour l'affichage
  const formattedStartDate = this.formatDate(this.timelineData.startDate);
  const formattedEndDate = this.formatDate(this.timelineData.endDate);

  const yearFormatter = timeFormat('%Y');
  const dateFormatter = timeFormat('%b %Y');

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
    const xStart: number = friseStart + xScale(this.timelineData.startDate);
    const xEnd: number = friseStart + xScale(this.timelineData.endDate);

    // Ajoutez le rectangle de la plage sélectionnée
    svg.append('rect')
      .attr('x', xStart)
      .attr('y', friseHeight / 2 - 25)
      .attr('width', xEnd - xStart)
      .attr('height', 30)
      .style('fill', 'black');

      // Ajoutez le texte pour afficher la date de début PERIODE SELECTIONNE 
      svg.append('text')
        .attr('x', xStart)
        .attr('y', friseHeight / 2 - 35)
        .style('text-anchor', 'middle')
        .style('font-size', '17px')
        .style('fill', 'black')
        .text(yearFormatter(formattedStartDate));

    // Ajoutez le texte pour afficher la date de fin PERIODE SELECTIONNE 
    svg.append('text')
        .attr('x', xEnd)
        .attr('y', friseHeight / 2 - 35)
        .style('text-anchor', 'middle')
        .style('font-size', '17px')
        .style('fill', 'black')
        .text(yearFormatter(formattedEndDate));

    // Ajoutez le texte pour afficher la date de début sur la frise
    svg.append('text')
        .attr('x', friseStart + 20)
        .attr('y', friseHeight / 2 + 25)
        .style('text-anchor', 'middle')
        .style('font-size', '17px')
        .style('fill', 'brown')
        .text(yearFormatter(minStartDate));

    // Ajoutez le texte pour afficher la date de fin sur la frise
    svg.append('text')
        .attr('x', friseStart + friseWidth)
        .attr('y', friseHeight / 2 + 25)
        .style('text-anchor', 'end')
        .style('font-size', '17px')
        .style('fill', 'brown')
        .text(yearFormatter(maxStartDate));

   // DATE DES EVENEMENTS
    svg.selectAll('.event-text')
     .data(this.timelineData.dates as Date[])
     .enter()
     .append('text')
     .attr('x', (date: Date) => friseStart + xScale(date))
     .attr('y', friseHeight / 2 + 45)
     .style('text-anchor', 'middle')
     .style('font-size', '18px')
     .style('fill', 'black')
     .text((date: Date) => dateFormatter(date));

    // CERCLE DES DATES
    svg.selectAll('.event-circle')
        .data(this.timelineData.dates as Date[])
        .enter()
        .append('circle')
        .attr('cx', (date: Date) => friseStart + xScale(date))
        .attr('cy', friseHeight / 2 - 10)
        .attr('r', 15)
        .style('fill', (date: Date) => this.timelineData.color);

    // NOM DES EVENEMENTS 
    svg.selectAll('.event-text') 
        .data(this.timelineData.dates as Date[])
        .enter()
        .append('text')
        .attr('x', (date: Date) => friseStart + xScale(date))
        .attr('y', friseHeight / 2 + 65)
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', 'black')
        .text((date: Date, index: number) => {
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
   
    // Ajoutez le texte pour afficher la date de début PERIODE SELECTIONNE 
    svg.append('text')
        .attr('x', friseHeight / 2 + 55)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', yStart+10)
        .style('text-anchor', 'middle')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '17px')
        .style('fill', 'black')
        .text(yearFormatter(this.timelineData.startDate));

    // Ajoutez le texte pour afficher la date de fin PERIODE SELECTIONNE 
    svg.append('text')
        .attr('x', friseHeight / 2 + 55)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', yEnd-10)
        .style('text-anchor', 'middle')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '17px')
        .style('fill', 'black')
        .text(yearFormatter(this.timelineData.endDate));

    // Ajoutez le texte pour afficher la date de début sur la frise
    svg.append('text')
        .attr('x', friseHeight / 2 + 25)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', friseStartY - 10)
        .style('text-anchor', 'start')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '17px')
        .style('fill', 'brown')
        .text(yearFormatter(minStartDate));

    // Ajoutez le texte pour afficher la date de fin sur la frise
    svg.append('text')
        .attr('x', friseHeight / 2 + 25)  // Ajustez la position du texte à gauche de la ligne de début
        .attr('y', friseStartY + friseHeightY -10)
        .style('text-anchor', 'start')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '17px')
        .style('fill', 'brown')
        .text(yearFormatter(maxStartDate));
    

    // DATE DES EVENEMENTS
    svg.selectAll('.event-text')
    .data(this.timelineData.dates as Date[])
    .enter()
    .append('text')
    .attr('x', friseHeight / 2 -20)  // Ajustez la position avec le décalage de départ
    .attr('y', (date: Date) => friseStartY + yScale(date))
    .style('text-anchor', 'end')  // Utilisez 'end' pour aligner le texte à droite
    .style('font-size', '18px')
    .style('fill', 'black')
    .text((date: Date) => dateFormatter(date));

    // CERCLE DES DATES
    svg.selectAll('.event-circle')
     .data(this.timelineData.dates as Date[])
        .enter()
        .append('circle')
        .attr('cx', friseHeight / 2)  // Ajustez la position avec le décalage de départ
        .attr('cy', (date: Date) => friseStartY + yScale(date))
        .attr('r', 15)
        .style('fill', (date: Date)  => this.timelineData.color);

    // NOM DES EVENEMENTS 
    svg.selectAll('.event-text')
     .data(this.timelineData.dates as Date[])
        .enter()
        .append('text')
        .attr('x', friseHeight / 2 -120)  // Ajustez la position avec le décalage de départ
        .attr('y', (date: Date) => friseStartY + yScale(date))
        .style('text-anchor', 'end')  // Utilisez 'end' pour aligner le texte à droite
        .style('font-size', '14px')
        .style('fill', 'black')
        .text((date: Date, index: number) => {
            const eventName = this.timelineData.nom.split(', ')[index];
            return eventName;
        });
      }
  }

  generateTimeline() {
    // Appel de la fonction de dessin du graphique avec les nœuds calculés par l'objet Force
    this.drawFrise();
  }

  exportTimeline() {
    const container = document.querySelector('.frise-container.my-custom-frise');
    const svgElement = container?.querySelector('svg');

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

  exportSVG(svgElement: any){

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

  exportPNG(svgElement: any) {
    console.log("export png");
    if (svgElement) {
      // Exportez le SVG en tant que fichier SVG
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);
  
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const svgUrl = window.URL.createObjectURL(svgBlob);
  
      // Créez un lien pour télécharger le fichier SVG
      const svgLink = document.createElement('a');
      svgLink.href = svgUrl;
      svgLink.download = 'timeline.svg';
      svgLink.click();
  
      // Révoquez l'URL du fichier SVG
      window.URL.revokeObjectURL(svgUrl);
  
      // Maintenant, convertissez le SVG en PNG
      const canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
  
      const context = canvas.getContext('2d');
      
      if (context) {
        const image = new Image();
        
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
  
          // Dessinez le SVG sur le canvas
          context.drawImage(image, 0, 0, image.width, image.height);
  
          // Exportez le canvas en tant que fichier PNG
          const imgData = canvas.toDataURL('image/png');
  
          // Créez un lien pour télécharger le fichier PNG
          const pngLink = document.createElement('a');
          pngLink.href = imgData;
          pngLink.download = 'timeline.png';
          pngLink.click();
  
          // Supprimez le canvas du corps du document
          document.body.removeChild(canvas);
        };
  
        // Chargez l'URL du fichier SVG dans l'image
        image.src = svgUrl;
      }
    }
  }

  exportPDF(svgElement: any) {
    console.log('export pdf');
    if (svgElement) {
      
      // Exportez le SVG en tant que fichier SVG
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);
  
      // Utilisez html2pdf pour exporter le contenu SVG en PDF
      const pdfElement = document.createElement('div');
      pdfElement.innerHTML = svgData;
      let pdfOptions;

      if (this.shape === 'horizontale') {
        pdfOptions = {
          margin: 2,
          filename: 'timeline.pdf',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: 'mm', format: [350,250], orientation: 'landscape' },
        };
      } else { // Par défaut ou pour la forme 'vertical'
        pdfOptions = {
          margin: 2,
          filename: 'timeline.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
      }
  
      html2pdf(pdfElement, pdfOptions).then((pdf: any) => { // Spécifiez le type de pdf
       
        // Téléchargez le PDF
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
      data: { color: this.color }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.color = result.color;
  
        // Mise à jour de la couleur dans le style de la frise
        this.timelineData.color = this.color;
        console.log("color:", this.timelineData.color );
        // Mettez à jour la couleur des cercles dans la frise existante
        this.drawFrise();
      }
    });
  }
  

}
