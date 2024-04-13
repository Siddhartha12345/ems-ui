import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee = {} as Employee;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    console.log('Employee id ', id);
    this.getEmployeeByEmpId(id);
  }

  getEmployeeByEmpId(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.employee = data;
    });
  }
}
