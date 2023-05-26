import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErreurComponent } from './erreur/erreur.component';
import { PageAdminComponent} from './page-admin/page-admin.component'
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil2Component } from './accueil2/accueil2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErreurComponent},
  {path: 'admin', component: PageAdminComponent},
  {path: 'index', component: AccueilComponent },
  {path: 'index2', component:Accueil2Component},
  {path: 'frise', component: PageFriseComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
