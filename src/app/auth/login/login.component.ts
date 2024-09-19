import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngAfterViewInit(): void {
    window.history.forward();
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          if(data){
            this.router.navigate(['/', '']);
          }
          console.log(data);

          // Token is stored in local storage, you can redirect to a protected route or perform other actions
        },
        (error) => {
          console.error(error);
          // Handle login errors
        }
      );
    }
  }
}
