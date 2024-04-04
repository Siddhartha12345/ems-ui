import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from 'src/services/employee.service';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-employee-edit-modal',
  templateUrl: './employee-edit-modal.component.html',
  styleUrls: ['./employee-edit-modal.component.css']
})
export class EmployeeEditModalComponent implements OnInit {

  formModal: any;
  registerForm: FormGroup;

  @Output()
  modalEmitter = new EventEmitter<boolean>();

  @Input()
  employeeId: string;

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router) {}

  ngOnInit(): void {
    console.log('Inside Edit Modal ngOnInit()...');
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );

    // initializing form
    this.registerForm = this.formBuilder.group({
      employeeId: [''],
      firstName: [''],
      lastName: [''],
      role: [''],
      designation: [''],
      gender: [''],
      salary: [],
      address: [''],
      emailId: [''],
      image: [''],
      mobileNo: [''],
      employeeInfo: [''],
      maritalStatus: ['']
    });

    this.formModal.show();

    this.getEmployeeDetailById(this.employeeId);
  }

  getEmployeeDetailById(empId: string) {
    this.employeeService.getEmployeeById(empId).subscribe((data: Employee) => {
      console.log('<<--Fetched Employee Data-->> : ', data);
      this.registerForm.setValue({
        employeeId: data['employeeId'],
        firstName: data['firstName'],
        lastName: data['lastName'],
        role: data['role'],
        designation: data['designation'],
        gender: data['gender'],
        salary: data['salary'],
        address: data['address'],
        emailId: data['emailId'],
        image: data['image'],
        mobileNo: data['mobileNo'],
        employeeInfo: data['employeeInfo'],
        maritalStatus: data['maritalStatus']
      });
      console.log('<<--Fetched Employee Form-->> : ', this.registerForm.value);
    });
  }

  onSubmit() {
    console.log('Form value: ', this.registerForm.value);
    this.employeeService.editEmployee(this.registerForm.value).subscribe((data) => {
      console.log('<<--PUT Response-->> : ', data);
      this.reloadCurrentRoute();
    });
    this.formModal.hide();  // removing the modal from employee-edit-modal component
    this.registerForm.reset();
    this.modalEmitter.emit(false);  // removing the employee-edit-modal component from employee-list component
  }

  // for reloading the current url - /employee 
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }
}
