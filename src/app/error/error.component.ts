import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorStatus: string;
  errorMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    if(this.route.snapshot.data?.['errorStatus'] == '404') {  // '404' error condition
      this.errorStatus = this.route.snapshot.data?.['errorStatus'];
      console.log('Activate route data:', this.errorStatus);
    } else {  // other error code condition (except 400)
      const navigation = this.router.getCurrentNavigation();
      this.errorStatus = navigation.extras.state?.['errorStatus'];
      console.log('Error status received', this.errorStatus);
    }
  }

  ngOnInit(): void {
    // get the error list
    const emsErrors = AppConfig.EMS_ERROR;
    // get the error message for the given error status
    this.errorMessage = emsErrors[this.errorStatus];
    console.log('Error message:', this.errorMessage);
  }
}
