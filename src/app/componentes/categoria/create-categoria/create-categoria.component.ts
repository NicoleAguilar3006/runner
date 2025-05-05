import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../models/categoria/categoria';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-categoria',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './create-categoria.component.html',
  styleUrl: './create-categoria.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCategoriaComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';
  isConfirmed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  registrarCategoria() {
    if (this.form.invalid) return;

    const dato: Categoria = {
      id: 0,
      nombre: this.form.value.nombre
    }

    this.categoriaService.add(dato).
      subscribe(response => {
        this.mensajeConfirmacion = 'Categoria registrada con éxito';
        this.router.navigate(['/categoria/list']);
      },
        error => {
          console.error('Error al registrar la categoria:', error);
        }
      );
  }

  requiresConfirmation(isConfirmed: boolean) {
    this.isConfirmed = isConfirmed;
  }
}
