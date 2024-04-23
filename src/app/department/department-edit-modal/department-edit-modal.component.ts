import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';
import { EMSUtil } from '../../util/ems-util';

declare var window: any;

@Component({
  selector: 'app-department-edit-modal',
  templateUrl: './department-edit-modal.component.html',
  styleUrls: ['./department-edit-modal.component.css']
})
export class DepartmentEditModalComponent implements OnInit {

  formModal: any;
  editForm: FormGroup;
  submitted: boolean = false;

  @Output()
  modalEmitter = new EventEmitter<boolean>();

  @Input()
  departmentId: string;

  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private router: Router) {}

  ngOnInit(): void {
    console.log('Inside edit employee ngOnInit()...');
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
    // initializing the form
    this.editForm = this.formBuilder.group({
      departmentId: [''],
      departmentName: ['', Validators.required],
      departmentHead: ['', Validators.required],
      departmentLogo: ['', [Validators.required, Validators.pattern(AppConfig.DEPT_LOGO_REGEX)]],
      departmentInfo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]]
    });

    this.formModal.show(); 
    this.getDepartmentById(this.departmentId);   
  }

  getDepartmentById(deptId: string) {
    this.departmentService.getDepartment(deptId).subscribe((data: Department) => {
      console.log('Data fetched:', data);
      this.editForm.setValue({
        departmentId: data.departmentId,
        departmentName: data.departmentName,
        departmentHead: data.departmentHead,
        departmentLogo: data.departmentLogo,
        departmentInfo: data.departmentInfo
      });
      console.log('Fetched department form:', this.editForm.value);
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('Submitted form value:', this.editForm.value);
    this.departmentService.editDepartment(this.editForm.value).subscribe(data => {
      console.log('Edited department value:', data);
      EMSUtil.reloadCurrentRoute(this.router);
      this.formModal.hide();  // removing the modal from department-edit-modal component
      this.editForm.reset();
      this.modalEmitter.emit(false);  // removing the department-edit-modal component from department-list component
    });
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }

  get editFormControl() {
    return this.editForm.controls;
  }
}
