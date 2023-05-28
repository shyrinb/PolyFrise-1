import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErreurComponent } from './erreur/erreur.component';
import { PageAdminComponent} from './page-admin/page-admin.component'
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil2Component } from './accueil2/accueil2.component';
import { PageFriseComponent } from './page-frise/page-frise.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {path: 'admin', component: LoginComponent},
  {path: 'error', component: ErreurComponent},
  {path: 'admin/submission', component: PageAdminComponent},
  {path: '', component: AccueilComponent },
  {path: 'index', component: Accueil2Component},
  {path: 'timeline', component: PageFriseComponent},
  {path: 'event', component: EventComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
