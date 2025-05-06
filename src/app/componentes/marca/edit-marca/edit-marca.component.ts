import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Marca } from '../../../models/marca/marca';
import { MarcaService } from '../../../service/marca/marca.service';

@Component({
  selector: 'app-edit-marca',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-marca.component.html',
  styleUrl: './edit-marca.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditMarcaComponent {
  form: FormGroup;
  marca: Marca = {
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
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
  
      if (id) {
        this.marcaService.findById(id).subscribe(
          response => {
            console.log(response)
            this.marca = response.response;
          },
          error => {
            console.error('Error al registrar la marca:', error);
          }
        );
      } else {
        console.error('ID no encontrado en la URL');
      }
    }
  
  
    editMarca() {
      if (this.form.invalid) return;
      this.isConfirmed = false;
  
      const dato: Marca = {
        id: 0,
        nombre: this.form.value.nombre
      }
  
      this.marcaService.edit(dato, this.marca.id).
        subscribe(response => {
  
          this.mensaje = 'Marca actualizada con éxito';
          this.isSuccessful = true
  
          setTimeout(() => {
            this.router.navigate(['/marca/list']);
          }, 3000);
  
        },
          e => {
            this.isError = true;
            this.mensaje = e.error.message;
            console.error('Error al registrar la marca:', e.error.message);
          }
        );
    }
  
    requiresConfirmation(isConfirmed: boolean) {
      this.mensaje = '¿Estás seguro de que quieres actualizar?';
      this.isConfirmed = isConfirmed;
    }
}
