import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from 'src/services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] = [];

  // modal
  formModal: any;
  
  // form
  registerForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // populating the employe list array with data
    this.getEmployeeList();

    // modal
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );

    // form initialization
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      maritalStatus: [''],
      gender: ['']
    });
  }

  getEmployeeList() {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employeeList = data;
      }
    );
  }

  // modal
  openFormModal() {
    // display the modal
    this.formModal.show();
  }

  // form on submit
  onSubmit() {
    console.log('Form value: ', this.registerForm.value);
    this.formModal.hide();
    this.registerForm.reset();
  }
}
