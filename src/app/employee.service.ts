import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('content-type', 'application/json')
    const EMP_BASE_URL = 'http://localhost:8083/employee-svc/api/v1';
    return this.http.get<Employee[]>(`${EMP_BASE_URL}/employee`, {
      'headers': headers
    });
  }
}
