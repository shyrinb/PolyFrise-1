import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErreurComponent } from './erreur/erreur.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { AccueilComponent } from './accueil/accueil.component';
import { Ng5SliderModule } from 'ng5-slider';
import { Accueil2Component } from './accueil2/accueil2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';
import { UpdateComponent } from './update/update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PopupCatComponent } from './popup-cat/popup-cat.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopupDateComponent } from './popup-date/popup-date.component';
import {MatSliderModule} from '@angular/material/slider';
import { PopupStyleComponent } from './popup-style/popup-style.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { PopupDescComponent } from './popup-desc/popup-desc.component';
import {MatChipsModule} from '@angular/material/chips';
import { PopupAddEventComponent } from './popup-add-event/popup-add-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { PopupAddEventAdminComponent } from './popup-add-event-admin/popup-add-event-admin.component';
import { PopupModifyEventAdminComponent } from './popup-modify-event-admin/popup-modify-event-admin.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { AvanceesComponent } from './avancees/avancees.component';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { EvenementshistoriquesComponent } from './evenementshistoriques/evenementshistoriques.component';
import { EvenementsinformatiquesComponent } from './evenementsinformatiques/evenementsinformatiques.component';
import { PersonnalitesComponent } from './personnalites/personnalites.component';
import { DistinctionsComponent } from './distinctions/distinctions.component';
import { GenerationinformatiqueComponent } from './generationinformatique/generationinformatique.component';
import { DomainesComponent } from './domaines/domaines.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { Pagefriseparam2Component } from './pagefriseparam2/pagefriseparam2.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { SubmissionadminComponent } from './submissionadmin/submissionadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErreurComponent,
    AccueilComponent,
    Accueil2Component,
    PageFriseComponent,
    UpdateComponent,
    PopupCatComponent,
    PageAdminComponent,
    PopupDateComponent,
    PopupStyleComponent,
    PopupDescComponent,
    InscriptionComponent,
    PopupAddEventComponent,
    PopupAddEventAdminComponent,
    PopupModifyEventAdminComponent,
    ProgrammesComponent,
    AvanceesComponent,
    EntreprisesComponent,
    EvenementshistoriquesComponent,
    EvenementsinformatiquesComponent,
    PersonnalitesComponent,
    DistinctionsComponent,
    GenerationinformatiqueComponent,
    DomainesComponent,
    Pagefriseparam2Component,
    SubmissionadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
