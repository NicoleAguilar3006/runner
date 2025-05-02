import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../service/account/account.service';
import { Signin } from '../../../models/account/signin/signin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
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

    const datos: Signin = this.signinForm.value;
    // const user = JSON.parse(localStorage.getItem('user')!);
    // console.log(user.nombre);
    this.authService.signin(datos).subscribe(
      (res) => {
        console.log(res);
        this.authService.saveUserData(res.response);
      },
      (err) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.error(err);
      }
    );
  }
}
