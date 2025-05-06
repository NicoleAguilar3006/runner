import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Talla } from '../../../models/talla/talla';
import { TallaService } from '../../../service/talla/talla.service';

@Component({
  selector: 'app-edit-talla',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-talla.component.html',
  styleUrl: './edit-talla.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditTallaComponent {
  form: FormGroup;
  talla: Talla = {
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
    private tallaService: TallaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
  
      if (id) {
        this.tallaService.findById(id).subscribe(
          response => {
            console.log(response)
            this.talla = response.response;
          },
          error => {
            console.error('Error al registrar la talla:', error);
          }
        );
      } else {
        console.error('ID no encontrado en la URL');
      }
    }
  
  
    editTalla() {
      if (this.form.invalid) return;
      this.isConfirmed = false;
  
      const dato: Talla = {
        id: 0,
        nombre: this.form.value.nombre
      }
  
      this.tallaService.edit(dato, this.talla.id).
        subscribe(response => {
  
          this.mensaje = 'Talla actualizada con éxito';
          this.isSuccessful = true
  
          setTimeout(() => {
            this.router.navigate(['/talla/list']);
          }, 3000);
  
        },
          e => {
            this.isError = true;
            this.mensaje = e.error.message;
            console.error('Error al registrar la talla:', e.error.message);
          }
        );
    }
  
    requiresConfirmation(isConfirmed: boolean) {
      this.mensaje = '¿Estás seguro de que quieres actualizar?';
      this.isConfirmed = isConfirmed;
    }
}
