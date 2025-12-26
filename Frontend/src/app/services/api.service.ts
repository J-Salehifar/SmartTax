import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Taxpayers
  getTaxpayers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/taxpayers/`);
  }

  createTaxpayer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/taxpayers/`, data);
  }

  // Cases
  getCases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cases/`);
  }

  createCases(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cases/`, data);
  }

  predictCases(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ai/predict-tax/`, data);
  }


  predictTax(data: any) {
    return this.http.post(`${this.baseUrl}/ai/predict-tax/`, data);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login/`, { username, password });
  }
}
  