import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { EMSUtil } from 'src/app/util/ems-util';

declare var window: any;

@Component({
  selector: 'app-department-delete-modal',
  templateUrl: './department-delete-modal.component.html',
  styleUrls: ['./department-delete-modal.component.css']
})
export class DepartmentDeleteModalComponent implements OnInit {

  @Input()
  departmentId: string;

  deleteModal: any;

  @Output()
  modalEmitter = new EventEmitter<boolean>();

  constructor(private departmentService: DepartmentService,
              private router: Router) {}

  ngOnInit(): void {
    console.log('Inside delete department ngOnInit()...');
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delModal')
    );
    this.deleteModal.show();
  }

  onSubmit() {
    this.departmentService.deleteDepartment(this.departmentId).subscribe(() => {
      console.log('Department deleted...');
      EMSUtil.reloadCurrentRoute(this.router);
      this.deleteModal.hide();  // removing the delete modal from delete department component
      this.modalEmitter.emit(false);  // removing the delete department component from department list component
    });
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }
}
