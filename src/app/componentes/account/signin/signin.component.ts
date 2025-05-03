import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../service/account/account.service';
import { Signin } from '../../../models/account/signin/signin';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
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
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
