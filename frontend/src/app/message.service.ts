import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private prefixe= 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    sendData(fin: string, data: any): Observable<any> {
      const url = this.prefixe + "/" + fin;
      return this.http.post<any>(url, data);
    }

    signup(data: any) {
      return this.http.post(`${this.prefixe}/inscription`, data);
    }

    login(data: any) {
      return this.http.post(`${this.prefixe}/connexion`, data);
    }

    getData(fin: string, data: any ): Observable<any>{
      const params = new HttpParams({fromObject: data});
      const url = this.prefixe + "/" + fin;
      return this.http.get<any>(url, { params });
    }

    getDataOnglets(fin: string): Observable<any> {
      const url = this.prefixe + fin;
      return this.http.get<any[]>(url);
    }
    
    getDataAuto(fin: string, token: any ): Observable<any>{

        // Créez les en-têtes de la requête avec le token d'authentification
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      const options = {headers:headers};
      const url = this.prefixe + "/" +fin;
      return this.http.get<any>(url,options);
    }

    sendDataAuto(fin: string, data: any,token: any ): Observable<any>{
      const url = this.prefixe + "/" + fin;
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      const options = {headers:headers};
      return this.http.post<any>(url,data,options);
    }
  }