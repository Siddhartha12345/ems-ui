import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { Router } from '@angular/router';
import { EMSUtil } from '../../util/ems-util';
import { AppConfig } from '../../app.config';
import { EmployeeService } from 'src/app/services/employee.service';

declare var window: any;

@Component({
  selector: 'app-employee-edit-modal',
  templateUrl: './employee-edit-modal.component.html',
  styleUrls: ['./employee-edit-modal.component.css']
})
export class EmployeeEditModalComponent implements OnInit {

  formModal: any;
  registerForm: FormGroup;
  submitted: boolean = false;

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      designation: ['', Validators.required],
      gender: ['', Validators.required],
      salary: [, Validators.required],
      address: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      emailId: ['', [Validators.required, Validators.pattern(AppConfig.EMP_EMAIL_REGEX)]],
      image: ['', [Validators.required, Validators.pattern(AppConfig.EMP_IMAGE_REGEX)]],
      mobileNo: ['', [Validators.required, Validators.pattern(AppConfig.EMP_MOBILE_REGEX)]],
      employeeInfo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]],
      maritalStatus: ['', Validators.required]
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
    this.submitted = true;
    console.log('Form value: ', this.registerForm.value);
    this.employeeService.editEmployee(this.registerForm.value).subscribe((data) => {
      console.log('<<--PUT Response-->> : ', data);
      EMSUtil.reloadCurrentRoute(this.router);
      this.formModal.hide();  // removing the modal from employee-edit-modal component
      this.registerForm.reset();
      this.modalEmitter.emit(false);  // removing the employee-edit-modal component from employee-list component
    });
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }

  // get the form controls for registerForm
  get registerFormControl() {
    return this.registerForm.controls;
  }
}
