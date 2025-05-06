import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarcaService } from '../../../service/marca/marca.service';
import { Router, RouterLink } from '@angular/router';
import { Marca } from '../../../models/marca/marca';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-marca',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './create-marca.component.html',
  styleUrl: './create-marca.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateMarcaComponent {
  form: FormGroup;

  
  titulo: string = 'Marca '; 
  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;


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
          id : 0,
          nombre : this.form.value.nombre
        }
    
        this.marcaService.add(dato).
          subscribe(response => {
            this.isSuccessful = true
            this.mensaje = 'Marca registrada con éxito'; 
            
            setTimeout(() => {
              this.router.navigate(['/marca/list']);
            }, 3000);
          },
            e => {
              this.isError = true;
              this.mensaje = e.error.message;
            }
          );
      }
}
