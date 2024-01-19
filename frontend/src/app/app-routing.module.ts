import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AvanceesComponent } from './avancees/avancees.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { EvenementsinformatiquesComponent } from './evenementsinformatiques/evenementsinformatiques.component';
import { EvenementshistoriquesComponent } from './evenementshistoriques/evenementshistoriques.component';
import { PersonnalitesComponent } from './personnalites/personnalites.component';
import { DistinctionsComponent } from './distinctions/distinctions.component';
import { GenerationinformatiqueComponent } from './generationinformatique/generationinformatique.component';
import { DomainesComponent } from './domaines/domaines.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { Accueil2Component } from './accueil2/accueil2.component';
import { Pagefriseparam2Component } from './pagefriseparam2/pagefriseparam2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { PopupModifyEventComponent } from './popup-modify-event/popup-modify-event.component';
import { PopupAddEventComponent } from './popup-add-event/popup-add-event.component';
import { PopupDeleteEventComponent } from './popup-delete-event/popup-delete-event.component';
import { PageSuggComponent } from './page-sugg/page-sugg.component';

const routes: Routes = [
  // AUTHENTIFICATION
  {path: '', redirectTo: 'inscription', pathMatch: 'full'},
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component: InscriptionComponent},
  // 
  {path: 'submission', component: PageAdminComponent},
  
  {path: 'accueil', component: AccueilComponent },
  // TIMELINE
  {path: 'timeline', component: PageFriseComponent},
  {path: 'friseparam1', component: Accueil2Component},
  {path: 'friseparam2', component: Pagefriseparam2Component},
// ONGLETS
{path: 'programmes', component: ProgrammesComponent},
{path: 'avancees', component: AvanceesComponent },
{path: 'distinctions', component: DistinctionsComponent},
{path: 'personnalites', component: PersonnalitesComponent},
{path: 'entreprises', component: EntreprisesComponent},
{path: 'generationsinformatique', component: GenerationinformatiqueComponent},
{path: 'evenementsinformatiques', component: EvenementsinformatiquesComponent},
{path: 'domaines', component: DomainesComponent},
{path: 'evenementshistoriques', component: EvenementshistoriquesComponent},

// EVENT
{path: "add-event",component: PopupAddEventComponent},
{path: "modify-event",component: PopupModifyEventComponent},
{path: "delete-event",component: PopupDeleteEventComponent},


{path: 'suggestion', component: PageSuggComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
