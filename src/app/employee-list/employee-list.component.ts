import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList = [
    {
      employeeName: 'Manuella Nevoresky',
      role: 'Azure Cloud Developer',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg'
    },
    {
      employeeName: 'Samuel Hardy',
      role: 'Angular Developer',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg'
    },
    {
      employeeName: 'Tom Sunderland',
      role: 'Transport Admin',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-1.jpg'
    },
    {
      employeeName: 'John Tarly',
      role: 'Java Developer',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-7.jpg'
    },

    {
      employeeName: 'John Tarly',
      role: 'Java Developer',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-7.jpg'
    },
    {
      employeeName: 'John Tarly',
      role: 'Java Developer',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-7.jpg'
    },
    {
      employeeName: 'John Tarly',
      role: 'Java Developer',
      image: 'https://bootstrapious.com/i/snippets/sn-team/teacher-7.jpg'
    }
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
