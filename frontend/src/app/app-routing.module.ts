import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ErreurComponent } from './erreur/erreur.component';
import { PageAdminComponent} from './page-admin/page-admin.component'
import { AccueilComponent } from './accueil/accueil.component';
import { Pagefriseparam1Component } from './pagefriseparam1/pagefriseparam1.component';
import { UpdateComponent } from './update/update.component';
import { Pagefriseparam2Component } from './pagefriseparam2/pagefriseparam2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';
import { AvanceesComponent } from './avancees/avancees.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { EvenementsinformatiquesComponent } from './evenementsinformatiques/evenementsinformatiques.component';
import { EvenementshistoriquesComponent } from './evenementshistoriques/evenementshistoriques.component';
import { PersonnalitesComponent } from './personnalites/personnalites.component';
import { DistinctionsComponent } from './distinctions/distinctions.component';
import { GenerationinformatiqueComponent } from './generationinformatique/generationinformatique.component';
import { DomainesComponent } from './domaines/domaines.component';

const routes: Routes = [
  // AUTHENTIFICATION
  {path: '', redirectTo: 'inscription', pathMatch: 'full'},
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component: InscriptionComponent},
  // 
  {path: 'error', component: ErreurComponent},
  {path: 'submissions', component: PageAdminComponent},
  {path: 'accueil', component: AccueilComponent },
  {path: 'update', component: UpdateComponent},
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
  // TIMELINE
  {path: 'timeline', component: PageFriseComponent}, // ancien timeline
  {path: 'friseparam1', component: Pagefriseparam1Component},
  {path: 'friseparam2', component: Pagefriseparam2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
