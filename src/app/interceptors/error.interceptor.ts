import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  status: string;
  error: any;

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return new Observable(observer => {
      //subscribing to the request
      next.handle(request).subscribe(
        // success
        (res: HttpResponse<any>) => {
          if(res instanceof HttpResponse) {
            // continuing the HTTP cycle
            console.log('Successfully received response', res);
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          this.error = err.error;
          if(this.error.hasOwnProperty('status') && this.error.status != 400) { // handling the http error codes and opting out the 400 bad request condition
            console.log('Error encountered', this.error);
            this.status = this.error.status;
          }
          if(this.error.hasOwnProperty('errorCode')) {  // handling the application error codes
            console.log('Error encountered:', this.error);
            this.status = this.error.errorCode;
          }
          const navigationExtras: NavigationExtras = {
            state: {
              errorStatus: this.status
            }
          };
          this.router.navigateByUrl('/error', navigationExtras);
        }
      )
    });
  }
}
