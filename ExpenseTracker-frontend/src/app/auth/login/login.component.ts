import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareddataService } from 'src/app/services/shareddata/shareddata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  userDetails: any = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedDataService: ShareddataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe(
      (response: any) => {
        // login successful, save token to local storage and retrieve user details
        localStorage.setItem('token', response.token);
        this.authService.getUserDetails().subscribe(
          (user: any) => {
            console.log(response.token);
            this.sharedDataService.setUserDetails(user);
            this.userDetails = user;
          },
          (error) => {
            console.log(error);
          }
        );

        this.router.navigate(['/dashboard']);
        console.log('Login successful');
        console.log(response);
      },
      (error) => {
        // login failed, show error message
        this.errorMessage = 'Wrong user credentials';
        console.log(this.errorMessage);
      }
    );
    // this.router.navigate(['/']);
  }
}
