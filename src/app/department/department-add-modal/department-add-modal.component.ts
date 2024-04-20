import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { EMSUtil } from 'src/app/util/ems-util';

declare var window: any;

@Component({
  selector: 'app-department-add-modal',
  templateUrl: './department-add-modal.component.html',
  styleUrls: ['./department-add-modal.component.css']
})
export class DepartmentAddModalComponent implements OnInit {

  formModal: any;
  addForm: FormGroup;

  @Output()
  modalEmitter = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private router: Router) {}

  ngOnInit(): void {
    console.log('Inside add department ngOnInit()...');
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('addModal')
    );

    this.addForm = this.formBuilder.group({
      departmentName: [''],
      departmentHead: [''],
      departmentLogo: [''],
      departmentInfo: ['']
    });

    this.formModal.show();
  }

  onSubmit() {
    console.log('Form value:', this.addForm.value);
    this.departmentService.addDepartment(this.addForm.value).subscribe(data => {
      console.log('Department added:', data);
      EMSUtil.reloadCurrentRoute(this.router);
      this.formModal.hide();  // removing the modal from department-add-modal component
      this.addForm.reset();
      this.modalEmitter.emit(false);  // removing the department-add-modal from department-list component
    }); 
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }
}
