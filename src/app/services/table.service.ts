import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../../TableData';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'http://localhost:8080/api/acidentes';
  private username = 'user';
  private password = '4a986c8d-1ef1-41eb-9409-ff486245170c';

  constructor(private http: HttpClient) {}

  private get authHeader(): HttpHeaders {
    const credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });
  }

  getTableData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(this.apiUrl, {
      headers: this.authHeader,
    });
  }
}
