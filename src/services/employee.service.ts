import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { Employee } from 'src/app/model/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${AppSettings.EMP_BASE_URL}/employee`);
  }

  getEmployeeById(empId: string): Observable<Employee> {
    return this.http.get<Employee>(`${AppSettings.EMP_BASE_URL}/employee/${empId}`);
  }
}
