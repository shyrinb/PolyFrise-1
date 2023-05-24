import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErreurComponent } from './erreur/erreur.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { AccueilComponent } from './accueil/accueil.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErreurComponent},
  {path: 'admin', component: PageAdminComponent},
  {path: 'accueil', component: AccueilComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
