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
  

  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;

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
      id : 0,
      nombre : this.form.value.nombre
    }

    this.categoriaService.add(dato).
      subscribe(response => {
        this.isSuccessful = true
        this.mensaje = 'Categoría registrada con éxito'; 
        
        setTimeout(() => {
          this.router.navigate(['/categoria/list']);
        }, 3000);
      },
        e => {
          this.isError = true;
          this.mensaje = e.error.message;
        }
      );
  }

  
}
