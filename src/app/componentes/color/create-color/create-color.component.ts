import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Router } from '@angular/router';
import { Color } from '../../../models/color/color';
import { ColorService } from '../../../service/color/color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-color',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-color.component.html',
  styleUrl: './create-color.component.css'
})

export class CreateColorComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';

  constructor(
    private fb: FormBuilder, 
    private colorService: ColorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
   }

  registrarColor() {
    if (this.form.invalid) return;
    
    const dato: Color = {
      id : 0,
      nombre : this.form.value.nombre
    }

    this.colorService.add(dato).
      subscribe(response => {
        this.mensajeConfirmacion = 'Categoria registrada con éxito'; 
        
        setTimeout(() => {
          this.router.navigate(['/listadoCategorias']);
        }, 3000);
      },
        error => {
          console.error('Error al registrar la categoria:', error);
        }
      );
  }
}
