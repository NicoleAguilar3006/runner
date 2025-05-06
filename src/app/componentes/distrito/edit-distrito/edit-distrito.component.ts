import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Distrito } from '../../../models/distrito/distrito';
import { DistritoService } from '../../../service/distrito/distrito.service';

@Component({
  selector: 'app-edit-distrito',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-distrito.component.html',
  styleUrl: './edit-distrito.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditDistritoComponent {
form: FormGroup;
  distrito: Distrito = {
    idDto: 0,
    nombre: ""
  }

  mensaje: string = '';
    isConfirmed: boolean = false;
    isError: boolean = false;
    isSuccessful: boolean = false;
  
    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private distritoService: DistritoService,
      private router: Router
    ) {
      this.form = this.fb.group({
        nombre: ['', Validators.required]
      });
    }
  
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
    
        if (id) {
          this.distritoService.findById(id).subscribe(
            response => {
              console.log(response)
              this.distrito = response.response;
            },
            error => {
              console.error('Error al registrar el distrito:', error);
            }
          );
        } else {
          console.error('ID no encontrado en la URL');
        }
      }
    
    
      editDistrito() {
        if (this.form.invalid) return;
        this.isConfirmed = false;
    
        const dato: Distrito = {
          idDto: 0,
          nombre: this.form.value.nombre
        }
    
        this.distritoService.edit(dato, this.distrito.idDto).
          subscribe(response => {
    
            this.mensaje = 'Distrito actualizado con éxito';
            this.isSuccessful = true
    
            setTimeout(() => {
              this.router.navigate(['/distrito/list']);
            }, 3000);
    
          },
            e => {
              this.isError = true;
              this.mensaje = e.error.message;
              console.error('Error al registrar el distrito:', e.error.message);
            }
          );
      }
    
      requiresConfirmation(isConfirmed: boolean) {
        this.mensaje = '¿Estás seguro de que quieres actualizar?';
        this.isConfirmed = isConfirmed;
      }
}
