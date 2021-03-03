import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/patients');
  }

  getPatient(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/patients/${id}`);
  }

  addPatient(patient: Patient): Observable<any> {
    return this.httpClient.post('http://localhost:3000/patients', patient);
  }

  updatePatient(id: string, patient: Patient): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/patients/${id}`, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/patients/${id}`);
  }
}
