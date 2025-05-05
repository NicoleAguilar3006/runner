import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarcaService } from '../../../service/marca/marca.service';
import { Router } from '@angular/router';
import { Marca } from '../../../models/marca/marca';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-marca',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-marca.component.html',
  styleUrl: './create-marca.component.css'
})
export class CreateMarcaComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  registrarMarca() {
    if (this.form.invalid) return;

    const dato: Marca = {
      id: 0,
      nombre: this.form.value.nombre
    };

    this.marcaService.add(dato).subscribe(
      response => {
        this.mensajeConfirmacion = 'Marca registrada con éxito';

        setTimeout(() => {
          this.router.navigate(['/listadoMarcas']);
        }, 3000);
      },
      error => {
        console.error('Error al registrar la marca:', error);
      }
    );
  }
}
