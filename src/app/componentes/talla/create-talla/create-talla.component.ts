import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TallaService } from '../../../service/talla/talla.service';
import { Talla } from '../../../models/talla/talla';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-talla',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-talla.component.html',
  styleUrl: './create-talla.component.css'
})
export class CreateTallaComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';

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
    };

    this.tallaService.add(dato).subscribe(
      response => {
        this.mensajeConfirmacion = 'Talla registrada con éxito';

        setTimeout(() => {
          this.router.navigate(['/listadoTallas']);
        }, 3000);
      },
      error => {
        console.error('Error al registrar la talla:', error);
      }
    );
  }
}
