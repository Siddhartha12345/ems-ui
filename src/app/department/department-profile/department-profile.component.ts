import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-profile',
  templateUrl: './department-profile.component.html',
  styleUrls: ['./department-profile.component.css']
})
export class DepartmentProfileComponent implements OnInit {

  department: Department;

  constructor(private route: ActivatedRoute,
              private departmentService: DepartmentService) {}

  ngOnInit(): void {
    const deptId = this.route.snapshot.paramMap.get('id') as string;
    console.log('Department ID received:', deptId);
    this.getDepartment(deptId);    
  }

  getDepartment(deptId: string) {
    this.departmentService.getDepartment(deptId).subscribe(data => {
      console.log('Department data received:', data);
      this.department = data;
    });
  }
}
