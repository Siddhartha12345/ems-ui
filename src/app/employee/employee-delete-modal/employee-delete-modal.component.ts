import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeUtil } from '../../util/employee-util';
import { EmployeeService } from 'src/app/services/employee.service';

declare var window: any;

@Component({
  selector: 'app-employee-delete-modal',
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.css']
})
export class EmployeeDeleteModalComponent implements OnInit {

  @Input()
  employeeId: string;

  deleteModal: any;

  @Output()
  modalEmitter = new EventEmitter<boolean>();

  constructor(private employeeService: EmployeeService,
              private router: Router) {}

  ngOnInit(): void {
    console.log('Inside delete employee ngOnInit() method...');
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delModal')
    );
    this.deleteModal.show();
  }

  onSubmit() {
    console.log('Employee deleted....');
    this.employeeService.deleteEmployee(this.employeeId).subscribe(() => {
      console.log('Employee deleted...');
      EmployeeUtil.reloadCurrentRoute(this.router);
      this.deleteModal.hide();  // removing the modal from employee-delete-modal component
      this.modalEmitter.emit(false);  // removing the employee-delete-modal component from employee-list component
    });
  }

  onCancel() {
    this.modalEmitter.emit(false);
  }
}
