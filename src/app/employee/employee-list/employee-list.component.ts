import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { BasicDetail } from '../../model/basic-detail';

declare var window: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: BasicDetail[] = [];

  showModal: boolean = false;

  modalType: string;

  basicEmployeeId: string;

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

  // modal
  openFormModal(operationType: string, empId?: string) {
    // display the modal
    this.showModal = true;
    if(operationType != 'add') {
      console.log('<<--Employee ID-->>: ', empId);
      this.basicEmployeeId = empId;
    }
    this.modalType = operationType;
  }

  modalEmit(event: boolean) {
    this.showModal = event;
  }
}
