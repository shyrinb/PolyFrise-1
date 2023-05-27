import { Component, OnInit } from '@angular/core';
import * as labella from 'labella';

;

interface TimelineItem {
  date: Date,
 label: string;
 
}
@Component({
  selector: 'app-page-frise',
  templateUrl: './page-frise.component.html',
  styleUrls: ['./page-frise.component.css']
})
export class PageFriseComponent implements OnInit {
  downloadFormats = {
    csv: false,
    jpeg: false,
    pdf: false
  };
  
  timelineItems: TimelineItem[] = [
      { date: new Date(2023, 0, 1), label: 'Événement 1' },
      { date: new Date(2023, 3, 1), label: 'Événement 2' },
      { date: new Date(2023, 6, 1), label: 'Événement 3' },
      { date: new Date(2023, 9, 1), label: 'Événement 4' },
      { date: new Date(2023, 11, 31), label: 'Événement 5' }
    ];
  
    ngOnInit() {
      this.generateTimeline();
    }
  
    generateTimeline() {
      const nodes = this.timelineItems.map(item => new labella.Node(item.date.getTime(), 0));
      const layout = new labella.Force({
        nodes: nodes,
        nodeSize: 40,
        timeUnit: labella.Force.SECONDS
      });
  
      layout.compute();
  
      const labels = nodes.map((node, index) => {
        const item = this.timelineItems[index];
        const x = node.currentPos.x;
        const y = node.currentPos.y;
        return { x, y, label: item.label };
      });
  
      console.log(labels);
      // Utilisez les données des labels pour afficher la frise générée dans votre template HTML
    }
  
  exportTimeline() {
    // Logique pour exporter la frise selon les formats sélectionnés
  }

  changeCategories() {
    // Logique pour changer les catégories de la frise
  }

  changeTimelineStyle() {
    // Logique pour changer le style de la frise
  }

  sendSuggestion() {
    // Logique pour envoyer une suggestion de modification
  }
}

