import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as labella from 'labella';
import * as d3 from "d3";
import { ActivatedRoute } from '@angular/router';
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
    csv: false,
    jpeg: false,
    pdf: false
  };

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
  constructor(private route: ActivatedRoute, private messageService : MessageService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      const rawData = JSON.parse(params['data']);
      this.timelineData = this.processData(rawData);
      this.drawFrise();
    });
  }

  formatDate(date: Date): string {
    // Formatez la date comme vous le souhaitez, par exemple : 'YYYY-MM-DD'
    return date.getFullYear().toString();
  }

  processData(rawData: any): any {
    console.log("AVANT FORMATAGE DE LA DATE", rawData);
    
    // Vérifiez si rawData.date est défini avant d'extraire les années
    const formattedDates = rawData.date
      ? rawData.date.split(',').map((date: string) => this.formatDate(new Date(date)))
      : [];
    
    // Créez un nouvel objet avec les dates au format années
    const processedData = {
      categories: rawData.categories,
      nom: rawData.nom,
      dates: formattedDates,
      startDate: rawData.startDate,
      endDate: rawData.endDate,
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

      const minStartDate = new Date('1900-01-01');
      const maxStartDate = new Date('2024-01-01');

      const friseStartX = 100;
      // Obtenez la date de début minimale de vos données
      const dataMinStartDate = d3.min(this.timelineData.dates, (date: string) => new Date(date)) || minStartDate;

      // Obtenez la date de début minimale de vos données
      const dataMaxFinDate = d3.min(this.timelineData.dates, (date: string) => new Date(date)) || maxStartDate;

      // Étendez la plage minimale pour prendre en compte la date de début minimale des données
      const xScale = d3.scaleTime()
          .domain([dataMinStartDate, new Date('2023-12-31')])
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

        // Ajoutez DATE DE L'EVENEMENT OK
        svg.selectAll('.event-text')
        .data(this.timelineData.dates)
        .enter()
        .append('text')
        .attr('x', (date: string) => friseStartX + xScale(new Date(date))) // Ajustez la position avec le décalage de départ
        .attr('y', height / 2 + 45) // Ajustez la position du texte au-dessus de la ligne de début
        .style('text-anchor', 'middle') // ou 'end' selon vos préférences
        .style('font-size', '20px')
        .style('fill', 'black')
        .text((date: string) => date);
         // Utilisez le nom de l'événement

        // POINT DE COULEUR DES EVENEMENTS OK
        svg.selectAll('.event-circle')
        .data(this.timelineData.dates)
        .enter()
        .append('circle')
        .attr('cx', (date: string) => friseStartX + xScale(new Date(date)))
        .attr('cy',  height / 2 - 10)
        .attr('r', 15)
        .style('fill', (date: string) => this.timelineData.color);

        // Ajoutez le texte pour afficher la date de début sur la frise
        svg.append('text')
        .attr('x', friseStartX + 20)
        .attr('y', height / 2 + 25) // Ajustez la position du texte au-dessus de la ligne de début
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(this.timelineData.startDate); // Utilisez la couleur de l'événement

        // Ajoutez le texte pour afficher la date de fin sur la frise
        svg.append('text')
        .attr('x', friseStartX + friseWidth -50 )
        .attr('y', height / 2 + 25) // Ajustez la position du texte au-dessus de la ligne de début
        .style('text-anchor', 'start')
        .style('font-size', '20px')
        .style('fill', 'black')
        .text(this.timelineData.endDate); 

        const data = this.timelineData.dates.map((date, index) => ({ date, nom: this.timelineData.nom[index] }));

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
    const containerElement = document.querySelector('#timeline');
    const svgElement = containerElement?.querySelector('svg');

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
      case 'csv':
        this.exportCSV()
        break;
      default:
        this.exportSVG(svgElement)
        break;
    }
  }

  exportSVG(svgElement : any){


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
    if (svgElement) {
      domtoimage.toBlob(svgElement)
        .then((blob: Blob) => {
          saveAs(blob, 'timeline.png');
        });
    }

  }

  exportPDF(svgElement : any){
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

  exportCSV(){
    const separator = ','; // Caractère de séparation des valeurs

    // Générer les en-têtes du CSV
    const timelineItems = this.timelineItems.concat(this.timelineItemsTmp).map(element1 => {
      const element2 = this.updatedItemTmp.find(element => element.event.id === element1.event.id);
      return element2 ?  element2 : element1;
    }).filter((event : TimelineItem) =>!this.deletedItemTmp.includes(event.event.id)).map((event : any) => {return(event.event) })


    if(timelineItems.length == 0 ){
      console.log("pas d'évènements")
      return
    }
    const headers = Object.keys(timelineItems[0]);
    const headerRow = headers.join(separator);

    // Générer les lignes de données
    const rows = timelineItems.map((item : any ) => {
      return headers.map(header => {
        if(item[header] instanceof Date){
          return `"${item[header].toLocaleDateString('fr-FR') }"`;
        }
        if(Array.isArray(item[header])){
          return `"${item[header].map((e : any) => {return e.id}) }"`;
        }
        return `"${item[header]}"`
      }).join(separator);
    });

    // Concaténer les en-têtes et les lignes de données
    const csvContent : string = `${headerRow}\n${rows.join('\n')}`;
    // Créer un objet Blob avec le contenu CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Télécharger le fichier CSV
    saveAs(blob, 'timeline.csv');
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