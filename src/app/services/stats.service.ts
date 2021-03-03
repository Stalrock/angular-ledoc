import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpClient: HttpClient) { }

  getStats(period: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/stats?period=${period}`);
  }
}
