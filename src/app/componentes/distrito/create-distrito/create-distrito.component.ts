import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorService } from '../../../service/color/color.service';
import { Router } from '@angular/router';
import { Distrito } from '../../../models/distrito/distrito';
import { DistritoService } from '../../../service/distrito/distrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-distrito',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-distrito.component.html',
  styleUrl: './create-distrito.component.css'
})
export class CreateDistritoComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';
  titulo: string = '¿Cuál es tu distrito?'; 

  constructor(
    private fb: FormBuilder, 
    private distritoService: DistritoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
   }

  registrarDistrito() {
    if (this.form.invalid) return;
    
    const dato: Distrito = {
      idDto : 0,
      nombre : this.form.value.nombre
    }

    this.distritoService.add(dato).
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
