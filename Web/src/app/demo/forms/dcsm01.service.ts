import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dcsm01Service {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl; 

  save(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipes/save`, data);
  }

  getAllRecipes(jobName: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipes/list?jobName=${jobName}&page=${page}&size=${size}`);
  }

  getRecipeById(recipeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipes/detail?recipeId=${recipeId}`);
  }

}