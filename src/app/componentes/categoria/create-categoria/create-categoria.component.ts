import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../models/categoria/categoria';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-categoria',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-categoria.component.html',
  styleUrl: './create-categoria.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCategoriaComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';
  isConfirmed: boolean = false;
  titulo: string = 'Categoría';

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
    };

    this.categoriaService.add(dato).subscribe(
      response => {
        this.mensajeConfirmacion = 'Categoría registrada con éxito';
        
        // Redirigir automáticamente a la lista de categorías después de la creación
        this.router.navigate(['/categoria/list']);
      },
      error => {
        console.error('Error al registrar la categoría:', error);
      }
    );
  }

  requiresConfirmation(isConfirmed: boolean) {
    this.isConfirmed = isConfirmed;
  }

  volverALaLista() {
    this.router.navigate(['/categoria/list']);
  }
}
