import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  // specific to employee
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/:id', component: EmployeeProfileComponent },
  // specific to department
  { path: 'department', component: DepartmentListComponent },
  // error
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent, data: { errorStatus: '404' }  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
