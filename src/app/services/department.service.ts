import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { Department } from 'src/app/model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {}

  getDepartmentList(): Observable<Department[]> {
    return this.http.get<Department[]>(`${AppConfig.API_GATEWAY_URL}${AppConfig.DEPT_CONTEXT_PATH}/department`);
  }

  getDepartment(deptId: string): Observable<Department> {
    return this.http.get<Department>(`${AppConfig.API_GATEWAY_URL}${AppConfig.DEPT_CONTEXT_PATH}/department/${deptId}`);
  }
}
