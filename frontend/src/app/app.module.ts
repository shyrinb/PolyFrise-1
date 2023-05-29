import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErreurComponent } from './erreur/erreur.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Ng5SliderModule } from 'ng5-slider';
import { Accueil2Component } from './accueil2/accueil2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';
import { UpdateComponent } from './update/update.component';
import { EventComponent } from './event/event.component';
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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErreurComponent,
    PageAdminComponent,
    AccueilComponent,
    Accueil2Component,
    PageFriseComponent,
    UpdateComponent,
    PopupCatComponent,
    PopupDateComponent,
    PopupStyleComponent,
    EventComponent
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
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
