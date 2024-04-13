import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddModalComponent } from './employee-add-modal.component';

describe('EmployeeAddModalComponent', () => {
  let component: EmployeeAddModalComponent;
  let fixture: ComponentFixture<EmployeeAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
