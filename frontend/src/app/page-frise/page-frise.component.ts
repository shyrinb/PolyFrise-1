import { Component, OnInit } from '@angular/core';
import * as labella from 'labella';
import * as d3 from "d3";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCatComponent } from '../popup-cat/popup-cat.component';
import { PopupDateComponent } from '../popup-date/popup-date.component';
import { PopupStyleComponent } from '../popup-style/popup-style.component';
interface TimelineItem {
  event : any;
  h?: number; // Ajoutez la propriété h de type number (optionnelle)
  w?: number; // Ajoutez la propriété w de type number (optionnelle)
}
@Component({
  selector: 'app-page-frise',
  templateUrl: './page-frise.component.html',
  styleUrls: ['./page-frise.component.css']
})
export class PageFriseComponent implements OnInit {
  downloadFormats = {
    svg: false,
    csv: false,
    jpeg: false,
    pdf: false
  };

  selectedFormat : string ="";
  categories : any;
  startDate : any;
  endDate : any;
  labels: any;
  timelineItems: TimelineItem[] = []
  color : any ;
  shape : any;
    constructor(private route: ActivatedRoute, private messageService : MessageService,public dialog: MatDialog) {}

    ngOnInit() {

      this.route.queryParams.subscribe(params => {
        const donnees = JSON.parse(params['data']);
        this.color = donnees.color
        this.shape = donnees.shape

        this.categories = donnees.categories;
        this.startDate = donnees.startDate;
        this.endDate = donnees.endDate;

        const data = {
          categories : donnees.categories,
          startDate : donnees.startDate,
          endDate : donnees.endDate
        }
        this.messageService.sendData("timeline", data).subscribe(
          response => {
            this.timelineItems = response.map((e: any) => {
              e.date = new Date(e.date); // Conversion de la chaîne de date en objet Date
              return {
                event: e
              };
            });
            this.generateTimeline();

        })
      });

    }

    draw() {
      var options = {
        margin: {
            left: 20,
            right: 20,
            top: 100,
            bottom: 100
        },
        initialWidth: 500,
        initialHeight: 1000,
      };

      // Calcul des dimensions utiles de la frise
      var innerWidth = options.initialWidth - options.margin.left - options.margin.right;
      var innerHeight = options.initialHeight - options.margin.top - options.margin.bottom;

      d3.select("#timeline").html("");
      // Select the SVG element with ID "timeline"
      var svg = d3.select('#timeline').append('svg')
        .attr('width', options.initialWidth)
        .attr('height', options.initialHeight)
        .append('g')
        .attr('transform', 'translate(' + (options.margin.left) + ',' + (options.margin.top) + ')');

      // Fonction pour la création du texte de chaque label
      function labelText(d : TimelineItem) {
        return d.event.date.toLocaleDateString('fr-FR') + ' - ' + d.event.title;
      }

      // Création d'un élément "dummyText" pour mesurer la taille de chaque label
      var dummyText = svg.append('text');

      // Définition de l'échelle de temps
      const timeScale = d3.scaleTime()
        .domain(d3.extent(this.timelineItems, (d: TimelineItem) => d.event.date)as [Date, Date])
        .range([0, innerHeight])
        .nice();

      // Création des noeuds de la frise
      var nodes: any = this.timelineItems.map(function(element) {
        // Mesure de la taille du texte pour chaque label
        var textElement = dummyText.text(labelText(element)).node();
        if (textElement) {
          var bbox = textElement.getBBox();
          element.h = bbox.height;
          element.w = bbox.width;
        }
        // Création des nœuds avec la librairie "labella.js"
        return new labella.Node(timeScale(element.event.date), (element.h ?? 0) + 4, element);
      });

      // Suppression de l'élément "dummyText"
      dummyText.remove();

      // Ajout d'une ligne pour représenter la timeline
      svg.append('line')
        .style('stroke', this.color)
        .style('stroke-width', '20px') // Ajout de l'épaisseur de 20px
        .classed('timeline', true)
        .attr('y2', innerHeight);

      // Création de 3 groupes d'éléments pour les noeuds, les liens et les labels
      var linkLayer = svg.append('g');
      var labelLayer = svg.append('g');
      var dotLayer = svg.append('g');

      // Ajout d'un cercle pour chaque noeud
      dotLayer.selectAll('circle.dot')
        .data(nodes)
        .enter().append('circle')
        .classed('dot', true)
        .attr('r', 3)
        .attr('cy', function(d: any) {
          return d.getRoot().idealPos;
        })
        .style('fill', '#D4F6F0'); // Ajout de la couleur #D4F6F0

      // Fonction de couleur
      function color(d: any, i: number): string {
        return '#1D1F20';
      }

      // Création d'un objet Renderer de la librairie "labella.js"
        // Ici, on instancie un objet Renderer de la bibliothèque "labella.js"
        var renderer = new labella.Renderer({
          layerGap: 60, // Définition de l'espace entre les couches du graphique
          nodeHeight: nodes[0] ? nodes[0].width : 10, // Hauteur des nœuds du graphique
          direction: 'right' // Direction du graphique (ici, de gauche à droite)
      });

      // Création d'un objet Force de la bibliothèque "labella.js"
      var force = new labella.Force({
        minPos: -10 // Position minimale des nœuds
      })
      .nodes(nodes) // Ajout des nœuds fournis en entrée
      .compute(); // Calcul des positions des nœud

      renderer.layout(nodes); // Création de la disposition des nœuds

      // Sélection de l'élément SVG qui contiendra les étiquettes
      var sEnter = labelLayer.selectAll<SVGGElement, any>('rect.flag')
        .data(nodes)
        .enter().append('g')
        .attr('transform', function(d: any) {
          return 'translate(' + (d.x) + ',' + (d.y - d.dy / 2) + ')';
        });

      // Ajout d'un rectangle pour chaque étiquette
      sEnter
        .append('rect')
        .classed('flag', true)
        .attr('width', function(d: any) {
          return d.data.w + 9;
        })
        .attr('height', function(d: any) {
          return d.dy;
        })
        .attr('rx', 2)
        .attr('ry', 2)
        .style('fill', this.color);

      // Ajout du texte pour chaque étiquette
      sEnter
        .append('text')
        .attr('x', 4)
        .attr('y', 15)
        .style('fill', '#D4F6F0')
        .text(function(d: any) {
          return labelText(d.data);
        });

      // Sélection de l'élément SVG qui contiendra les liens
      linkLayer.selectAll('path.link')
        .data(nodes)
        .enter().append('path')
        .classed('link', true)
        .attr('d', function(d) {
            return renderer.generatePath(d);
        })
        .style('stroke', color)
        .style('stroke-width', 2)
        .style('opacity', 0.6)
        .style('fill', 'none');
    }


  generateTimeline() {
    // Appel de la fonction de dessin du graphique avec les nœuds calculés par l'objet Force
    this.draw();
  }

  exportTimeline() {
    // Logique pour exporter la frise selon les formats sélectionnés
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

  sendSuggestion() {
    // Logique pour envoyer une suggestion de modification
  }
}

