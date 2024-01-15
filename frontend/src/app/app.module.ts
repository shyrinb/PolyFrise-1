import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErreurComponent } from './erreur/erreur.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { Accueil2Component } from './accueil2/accueil2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';
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
import {MatChipsModule} from '@angular/material/chips';
import { PopupAddEventComponent } from './popup-add-event/popup-add-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
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
import { PopupDeleteEventComponent } from './popup-delete-event/popup-delete-event.component';
import { PopupModifyEventComponent } from './popup-modify-event/popup-modify-event.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErreurComponent,
    AccueilComponent,
    Accueil2Component,
    PageFriseComponent,
    PopupCatComponent,
    PageAdminComponent,
    PopupDateComponent,
    PopupStyleComponent,
    InscriptionComponent,
    PopupAddEventComponent,
    ProgrammesComponent,
    AvanceesComponent,
    EntreprisesComponent,
    PopupDeleteEventComponent,
    PopupModifyEventComponent,
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
    ReactiveFormsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
