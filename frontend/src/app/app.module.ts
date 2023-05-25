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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErreurComponent,
    PageAdminComponent,
    AccueilComponent,
    Accueil2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule, 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
