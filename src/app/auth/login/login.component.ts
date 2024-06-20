import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/model/login-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Inside login component ngOnInit() method...');
    this.authLoginForm = this.formBuilder.group({
      email: [],
      password: []
    });
  }

  onSubmit() {
    localStorage.clear(); // clear existing token during login
    console.log('Submitted form value:', this.authLoginForm.value);
    this.authService.login(this.authLoginForm.value).subscribe((data: LoginResponse) => {
      console.log('Login data response:', data);
      localStorage.setItem("access-token", data.accessToken);
      localStorage.setItem("refresh-token", data.refreshToken);
      console.log('Local Storage items:', localStorage);
      this.router.navigate(['/employee']);
    });
  }
}
