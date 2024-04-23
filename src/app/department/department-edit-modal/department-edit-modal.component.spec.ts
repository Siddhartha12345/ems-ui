import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEditModalComponent } from './department-edit-modal.component';

describe('DepartmentEditModalComponent', () => {
  let component: DepartmentEditModalComponent;
  let fixture: ComponentFixture<DepartmentEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
