import { Component, SecurityContext } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  login() {
    if (this.loginForm.valid) {

      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user = { password, email }
      this.api.loginAPI(user).subscribe({
        next: (res: any) => {
      alert(`${res.existingUser.username} logged in successfully!!`)
          sessionStorage.setItem('existingUser', JSON.stringify(res.existingUser))
          sessionStorage.setItem('token', res.token)
          this.loginForm.reset()
          // navigate to login
          this.router.navigateByUrl('')
        },
        error: (reason: any) => {
          alert(reason.error)
        }
      })
    } else {
      alert('Invalid Form')
    }
  }
}
