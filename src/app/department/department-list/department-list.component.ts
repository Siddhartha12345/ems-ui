import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departmentList: Department[];
  
  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    // get department list
    this.getDepartmentList();
  }

  getDepartmentList(): void {
    this.departmentService.getDepartmentList().subscribe((data) => {
      this.departmentList = data;
      console.log('Retrieved department list:', this.departmentList);
      this.departmentList.forEach((department: Department) => {
        // assign bgColor for each card
        department.departmentBgColor = this.fetchRandomDeptBgColor();
      });
    });
  }

  fetchRandomDeptBgColor(): string { 
    const min = 1;
    const max = 6;
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);  // min and max included
    console.log('Generated Random No', randomNum);
    const deptBgColorList = AppConfig.DEPT_BGCOLOR_LIST;
    console.log('Bg color based on generated random no', deptBgColorList[randomNum]);
    return deptBgColorList[randomNum];
  }
}
