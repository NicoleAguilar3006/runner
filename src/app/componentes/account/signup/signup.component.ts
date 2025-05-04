import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../service/account/account.service';
import { Signup } from '../../../models/account/signup/signup';
import { CommonModule } from '@angular/common';
import { DistritoService } from '../../../service/distrito/distrito.service';
import { Distrito } from '../../../models/distrito/distrito';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  router = inject(Router);
  signupForm: FormGroup;
  errorMessage: string = '';
  distritos: Distrito[] = [];

  constructor(
    private fb: FormBuilder, 
    private authService: AccountService,
    private distritoService: DistritoService,
  ) 
  {
    this.signupForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nmrDocumento: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      idDto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDistrito();
  }

  cargarDistrito(): void {
    this.distritoService.findAllDistrito().subscribe(
      (response) => {
        this.distritos = response.response;
      },
      (error) => {
        console.error('Error al cargar los colores:', error);
      }
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    const datos: Signup = {
      nombre : this.signupForm.value.nombre,
      apellido : this.signupForm.value.apellido,
      nmrDocumento : this.signupForm.value.nmrDocumento,
      telefono : this.signupForm.value.telefono,
      correo : this.signupForm.value.correo,
      contrasenia : this.signupForm.value.contrasenia,
      idDto : this.signupForm.value.idDto
    }

    console.log(datos)

    this.authService.signup(datos).subscribe(
      (res) => {
        console.log(res)
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(err.error.message)
      }
    );
  }
}
