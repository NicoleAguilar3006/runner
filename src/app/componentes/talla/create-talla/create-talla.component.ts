import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TallaService } from '../../../service/talla/talla.service';
import { Talla } from '../../../models/talla/talla';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-talla',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './create-talla.component.html',
  styleUrl: './create-talla.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateTallaComponent {
  form: FormGroup;

  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tallaService: TallaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  registrarTalla() {
    if (this.form.invalid) return;

    const dato: Talla = {
      id: 0,
      nombre: this.form.value.nombre
    }

    this.tallaService.add(dato).
      subscribe(response => {
        this.isSuccessful = true
        this.mensaje = 'Talla registrada con éxito';

        setTimeout(() => {
          this.router.navigate(['/talla/list']);
        }, 3000);
      },
        e => {
          this.isError = true;
          this.mensaje = e.error.message;
        }
      );
  }
}
