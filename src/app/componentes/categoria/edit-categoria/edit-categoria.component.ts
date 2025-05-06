import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Categoria } from '../../../models/categoria/categoria';

@Component({
  selector: 'app-edit-categoria',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditCategoriaComponent {
  form: FormGroup;
  categoria: Categoria = {
    id: 0,
    nombre: ""
  }

  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
  
      if (id) {
        this.categoriaService.findById(id).subscribe(
          response => {
            console.log(response)
            this.categoria = response.response;
          },
          error => {
            console.error('Error al registrar la categoría:', error);
          }
        );
      } else {
        console.error('ID no encontrado en la URL');
      }
    }
  
  
    editCategoria() {
      if (this.form.invalid) return;
      this.isConfirmed = false;
  
      const dato: Categoria = {
        id: 0,
        nombre: this.form.value.nombre
      }
  
      this.categoriaService.edit(dato, this.categoria.id).
        subscribe(response => {
  
          this.mensaje = 'Categoría actualizada con éxito';
          this.isSuccessful = true
  
          setTimeout(() => {
            this.router.navigate(['/categoria/list']);
          }, 3000);
  
        },
          e => {
            this.isError = true;
            this.mensaje = e.error.message;
            console.error('Error al registrar la categoria:', e.error.message);
          }
        );
    }
  
    requiresConfirmation(isConfirmed: boolean) {
      this.mensaje = '¿Estás seguro de que quieres actualizar?';
      this.isConfirmed = isConfirmed;
    }
}
