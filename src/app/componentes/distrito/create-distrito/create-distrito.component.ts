import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Distrito } from '../../../models/distrito/distrito';
import { DistritoService } from '../../../service/distrito/distrito.service';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-create-distrito',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './create-distrito.component.html',
  styleUrl: './create-distrito.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateDistritoComponent {
  form: FormGroup;

  
  titulo: string = 'Distrito'; 
  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;

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
          this.isSuccessful = true
          this.mensaje = 'Distrito registrado con éxito'; 
          
          setTimeout(() => {
            this.router.navigate(['/distrito/list']);
          }, 3000);
        },
          e => {
            this.isError = true;
            this.mensaje = e.error.message;
          }
        );
    }
}
