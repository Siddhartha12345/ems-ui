import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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
    this.formModal.hide();
    this.registerForm.reset();
    this.modalEmitter.emit(false);
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }
} 
