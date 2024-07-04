import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from 'src/app/model/login-response';
import { OAuth2Url } from 'src/app/model/oauth2-url';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authLoginForm: FormGroup;
  oauth2Url: string;
  oauth2Code: string;
  oauth2AccessToken: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Inside login component ngOnInit() method...');
    this.authLoginForm = this.formBuilder.group({
      email: [],
      password: []
    });
    // for oauth2 login
    this.route.queryParams.subscribe(params => {
      if(params['code'] !== undefined) {
        console.log('code found');
        this.oauth2Code = params['code'];
        this.oauth2login(this.oauth2Code);
      } else {
        console.log('code not found');
      }
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

  signInWithGoogle() {
    localStorage.clear();
    console.log('Google sign in initiated...!!!');
    this.authService.oauth2Url().subscribe((data: OAuth2Url) => {
      console.log('OAuth2 Url Response ', data);
      this.oauth2Url = data.url;
      window.location.href = this.oauth2Url;
    });
  }

  oauth2login(code: string) {
    this.authService.oauth2AccessToken(code).subscribe(data => {
      console.log('Oauth2 Access Token received ', data);
      this.oauth2AccessToken = data.accessToken;
      localStorage.setItem('access-token', this.oauth2AccessToken);
      this.router.navigate(['/home']);
    });
  }
}
