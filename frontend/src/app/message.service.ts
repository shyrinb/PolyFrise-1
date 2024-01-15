import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  prefixe: string;

    constructor(private http: HttpClient) {this.prefixe='http://localhost:3000/api'}

    sendData(fin: string, data: any): Observable<any> {
      const url = this.prefixe + "/" + fin;
      return this.http.post<any>(url, data);
    }

    getData(fin: string, data: any ): Observable<any>{
      const params = new HttpParams({fromObject: data});
      const url = this.prefixe + "/" + fin;
      return this.http.get<any>(url, { params });
    }

    signup(data: any) {
      return this.http.post(`${this.prefixe}/inscription`, data);
    }

    login(data: any) {
      return this.http.post(`${this.prefixe}/connexion`, data);
    }

    getDataByCategory(endpoint: string, data: any): Observable<any> {
      return this.http.post(`${this.prefixe}/${endpoint}`, data);
    }

    getDataOnglets(fin: string): Observable<any> {
      const url = this.prefixe + fin;
      return this.http.get<any[]>(url);
    }

    getDataAuto(fin: string, token: any ): Observable<any>{

        // Créez les en-têtes de la requête avec le token d'authentification
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      const options = {headers:headers};
      const url = this.prefixe + fin;
      return this.http.get<any>(url,options);
    }

    sendDataAdd(selectedCategory: string, formData: any): Observable<any> {
      const url = `${this.prefixe}/add-event`;
      formData.category = selectedCategory;  // Utilisez la même propriété ici
      console.log("formulaire service", formData);
      console.log("service categories", formData.category);  // Utilisez la même propriété ici
      return this.http.post<any>(url, formData);
    }
    
    sendDataMod(event_id:string, formData: any): Observable<any> {
      // Ajoutez la logique nécessaire pour envoyer les données au backend
      // Vous pouvez utiliser this.http.post pour envoyer les données au backend
      // Assurez-vous d'ajuster l'URL et la logique en fonction de votre API backend
      return this.http.post<any>(`${this.prefixe}/modif-event`, formData);
    }

    getChampByCategorie(selectedCategories: string): Observable<any[]> {
      console.log("données envoyées au backend", selectedCategories);
    
      const data = { categories: selectedCategories };
      console.log("données à envoyer", data);
    
      return this.http.post<any[]>(`${this.prefixe}/getchamp`, data);
    }
    
    sendDataAuto(fin: string, data: any,token: any ): Observable<any>{
      const url = this.prefixe + "/" + fin;
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      const options = {headers:headers};
      return this.http.post<any>(url,data,options);
    }
    getAllSubmissions(): Observable<any[]> {
      return this.http.get<any[]>(`${this.prefixe}/submissions`);
    }
  
    approveSubmission(submissionId: number): Observable<any> {
      return this.http.post<any>(`${this.prefixe}/approveSubmission/${submissionId}`, {});
    }
  
    rejectSubmission(submissionId: number): Observable<any> {
      return this.http.post<any>(`${this.prefixe}/rejectSubmission/${submissionId}`, {});
    }
  }

