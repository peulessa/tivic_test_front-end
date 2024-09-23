import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../../TableData';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'localhost:3000/api/receitas';

  constructor(private http: HttpClient) {}

  getTableData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(this.apiUrl);
  }
}
