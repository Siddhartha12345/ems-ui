import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // populating the employe list array with data
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employeeList = data;
      }
    );
  }
}
