import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';

declare var window: any;

@Component({
  selector: 'app-employee-add-modal',
  templateUrl: './employee-add-modal.component.html',
  styleUrls: ['./employee-add-modal.component.css']
})
export class EmployeeAddModalComponent implements OnInit {

  formModal: any;
  registerForm: FormGroup;

  @Output()
  modalEmitter = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router) {}

  ngOnInit(): void {
    console.log('Inside add employee ngOnInit()...');
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );

    this.registerForm = this.formBuilder.group({
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
  }

  onSubmit() {
    console.log('Form value: ', this.registerForm.value);
    this.employeeService.addEmployee(this.registerForm.value).subscribe((data) => {
      console.log(data);
      this.reloadCurrentRoute();
    });
    this.formModal.hide();  // removing the modal from employee-add-modal component
    this.registerForm.reset();
    this.modalEmitter.emit(false);  // removing the employee-add-modal component from employee-list component
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
