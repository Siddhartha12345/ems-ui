import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { BasicDetail } from 'src/app/model/basic-detail';
import { Employee } from 'src/app/model/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<BasicDetail[]> {
    return this.http.get<BasicDetail[]>(`${AppConfig.API_GATEWAY_URL}${AppConfig.EMP_CONTEXT_PATH}/employee`);
  }

  getEmployeeById(empId: string): Observable<Employee> {
    return this.http.get<Employee>(`${AppConfig.API_GATEWAY_URL}${AppConfig.EMP_CONTEXT_PATH}/employee/${empId}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${AppConfig.API_GATEWAY_URL}${AppConfig.EMP_CONTEXT_PATH}/employee`, employee);
  }
  
  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${AppConfig.API_GATEWAY_URL}${AppConfig.EMP_CONTEXT_PATH}/employee`, employee);
  }

  deleteEmployee(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${AppConfig.API_GATEWAY_URL}${AppConfig.EMP_CONTEXT_PATH}/employee/${employeeId}`);
  }
}
