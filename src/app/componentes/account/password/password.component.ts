import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../service/account/account.service';
import { Signin } from '../../../models/account/signin/signin';

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  router = inject(Router);
  signinForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AccountService,
  ) 
  {
    this.signinForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signinForm.invalid) return;

    const datos: Signin = {
      correo : this.signinForm.value.correo,
      contrasenia : this.signinForm.value.contrasenia
    }

    this.authService.signin(datos).subscribe(
      (res) => {
        this.authService.saveUserData(res.response);
        const rol = this.authService.getUserRol();
        if(rol === "ADMIN"){
          this.router.navigate(['/admin']);
          return;
        }
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
