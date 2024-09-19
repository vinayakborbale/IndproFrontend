import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSuccess: boolean=false ;
  registerError: boolean=false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (data) => {
          console.log(data);
          this.registerSuccess = true; // set a flag to indicate registration success
          this.router.navigate(['/login']); // redirect to login page

          
        },
        (error) => {
          console.error(error);
          this.registerError = true; // set a flag to indicate registration error
        }
      );
    }
  }
}
