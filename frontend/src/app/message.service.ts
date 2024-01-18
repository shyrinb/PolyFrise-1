import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  prefixe: string;
  private userStatusSubject: BehaviorSubject<string>;
  private userNameSubject: BehaviorSubject<string>;

  userStatus$: Observable<string>;
  userName$: Observable<string>;

    constructor(private http: HttpClient) {
      this.prefixe='http://localhost:3000/api'
      // Récupérer les valeurs stockées dans localStorage ou initialiser avec des valeurs par défaut
      const storedUserStatus = localStorage.getItem('userStatus') || '';
      const storedUserName = localStorage.getItem('userName') || '';
  
      this.userStatusSubject = new BehaviorSubject<string>(storedUserStatus);
      this.userNameSubject = new BehaviorSubject<string>(storedUserName);
  
      this.userStatus$ = this.userStatusSubject.asObservable();
      this.userName$ = this.userNameSubject.asObservable();
    
    }

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

    sendDataAdd(selectedCategory: string,formData: any,): Observable<any> {
      const url = `${this.prefixe}/add-event`;
      formData.category = selectedCategory;  // Utilisez la même propriété ici
      console.log("formulaire service", formData);
      console.log("service categories", formData.category);  // Utilisez la même propriété ici
      return this.http.post<any>(url, formData);
    }
    
    sendDataMod(selectedCategory: string, event_id: string, formData: any): Observable<any> {
      const url = `${this.prefixe}/modify-event`;
      const modifiedUrl = `${url}/${selectedCategory}/${event_id}`;
      console.log("formulaire service", formData);
      console.log("service categories", selectedCategory);
      console.log("service modification event", event_id);  
      return this.http.put<any>(modifiedUrl, formData);
    }

    sendDataDel(selectedCategory: string, event_id: string): Observable<any> {
      const url = `${this.prefixe}/del-event/}`;
      const supprUrl = `${url}/${selectedCategory}/${event_id}`;
      return this.http.delete<any>(supprUrl);
    }

    getChampByCategorie(selectedCategories: string): Observable<any[]> {
      console.log("données envoyées au backend", selectedCategories);
    
      const data = { categories: selectedCategories };
      console.log("données à envoyer", data);
    
      return this.http.post<any[]>(`${this.prefixe}/getchamp`, data);
    }
    
    getUserInfo(): Observable<any> {

      console.log("service pour recuperer le status ");
      const token = localStorage.getItem('jwtToken');
    
      if (!token) {
        // Retourner un observable vide si le token n'est pas présent
        return of(null);
      }
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      // Notez que le chemin est celui de la route de connexion (/login) plutôt que /userinfo
      return this.http.get<any>(`${this.prefixe}/userinfo`, { headers }).pipe(
        catchError(error => {
          // Gérer les erreurs ici, par exemple, rediriger l'utilisateur vers la page de connexion
          console.error('Erreur lors de la récupération des informations utilisateur', error);
          return of(null);
        })
      );
    }

    sendDataSugg(submissionData: any): Observable<any> {
      const url = `${this.prefixe}/add-sugg`;
      console.log("Service JSON", submissionData);
      
      return this.http.post<any>(url, submissionData);
    }

    sendDataDelSugg(ids: string[]): Observable<any> {
      const url = `${this.prefixe}/del-sugg`;
      return this.http.post<any>(url, { ids });
    }

    sendDataIgnSugg(ids: string[]): Observable<any> {
      const url = `${this.prefixe}/ignorate-sugg`;
      return this.http.post<any>(url, { ids });
    }

    sendDataValSugg(ids: string[]): Observable<any> {
      const url = `${this.prefixe}/validate-sugg`;
      return this.http.post<any>(url, { ids });
    }

    sendDataAuto(fin: string, data: any,token: any ): Observable<any>{
      const url = this.prefixe + "/" + fin;
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      const options = {headers:headers};
      return this.http.post<any>(url,data,options);
    }
    
    getSubmissions(): Observable<any[]> {
      return this.http.get<any[]>(`${this.prefixe}/submissions`);
    }
  
    approveSubmission(submissionId: number): Observable<any> {
      return this.http.post<any>(`${this.prefixe}/approveSubmission/${submissionId}`, {});
    }
  
    rejectSubmission(submissionId: number): Observable<any> {
      return this.http.post<any>(`${this.prefixe}/rejectSubmission/${submissionId}`, {});
    }

    sendDataUser(data: any) {
      this.userStatusSubject.next(data.status);
      localStorage.setItem('userStatus', data.status.toString()); // Utilisez data.status
    }
    
    sendDataUserName(data: any) {
      this.userNameSubject.next(data.login);
      localStorage.setItem('userName', data.login.toString()); // Utilisez data.login
    }
    

    getUserStatus(): Observable<string> {
      console.log("this.userStatus$",this.userStatus$);
      return this.userStatus$;
    }

    getUserName(): Observable<string> {
      console.log("this.userName$",this.userName$)
      return this.userName$;
    }
}