import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const authRequest = this.loginForm.value;
      this.authService.authenticate(authRequest).subscribe(response => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Login failed', error);
      });
    }
  }
}
