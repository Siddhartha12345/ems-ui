import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { HttpheaderInterceptor } from './interceptors/httpheader.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeAddModalComponent } from './employee/employee-add-modal/employee-add-modal.component';
import { EmployeeEditModalComponent } from './employee/employee-edit-modal/employee-edit-modal.component';
import { MobilePipe } from './pipe/mobile.pipe';
import { EmployeeDeleteModalComponent } from './employee/employee-delete-modal/employee-delete-modal.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    NavBarComponent,
    LoaderComponent,
    EmployeeProfileComponent,
    EmployeeAddModalComponent,
    EmployeeEditModalComponent,
    MobilePipe,
    EmployeeDeleteModalComponent,
    DepartmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpheaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
