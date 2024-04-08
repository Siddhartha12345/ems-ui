import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeUtil } from '../util/employee-util';

declare var window: any;

@Component({
  selector: 'app-employee-add-modal',
  templateUrl: './employee-add-modal.component.html',
  styleUrls: ['./employee-add-modal.component.css']
})
export class EmployeeAddModalComponent implements OnInit {

  formModal: any;
  registerForm: FormGroup;
  submitted: boolean = false;

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      designation: ['', Validators.required],
      gender: ['', Validators.required],
      salary: [, Validators.required],
      address: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')]],
      image: ['', [Validators.required, Validators.pattern('(http|https)+://[a-z0-9A-Z._%+-/]+\.(jpg|png)')]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      employeeInfo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]],
      maritalStatus: ['', Validators.required]
    });

    this.formModal.show();
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form value: ', this.registerForm.value);
    this.employeeService.addEmployee(this.registerForm.value).subscribe((data) => {
      console.log(data);
      EmployeeUtil.reloadCurrentRoute(this.router);
      this.formModal.hide();  // removing the modal from employee-add-modal component
      this.registerForm.reset();
      this.modalEmitter.emit(false);  // removing the employee-add-modal component from employee-list component
    });
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
} 
