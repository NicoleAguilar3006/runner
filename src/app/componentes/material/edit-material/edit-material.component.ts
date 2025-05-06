import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Material } from '../../../models/material/material';
import { MaterialService } from '../../../service/material/material.service';

@Component({
  selector: 'app-edit-material',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-material.component.html',
  styleUrl: './edit-material.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditMaterialComponent {
  form: FormGroup;
  material: Material = {
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
    private materialService: MaterialService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
  
      if (id) {
        this.materialService.findById(id).subscribe(
          response => {
            console.log(response)
            this.material = response.response;
          },
          error => {
            console.error('Error al registrar el material:', error);
          }
        );
      } else {
        console.error('ID no encontrado en la URL');
      }
    }
  
  
    editMaterial() {
      if (this.form.invalid) return;
      this.isConfirmed = false;
  
      const dato: Material = {
        id: 0,
        nombre: this.form.value.nombre
      }
  
      this.materialService.edit(dato, this.material.id).
        subscribe(response => {
  
          this.mensaje = 'Material actualizado con éxito';
          this.isSuccessful = true
  
          setTimeout(() => {
            this.router.navigate(['/material/list']);
          }, 3000);
  
        },
          e => {
            this.isError = true;
            this.mensaje = e.error.message;
            console.error('Error al registrar el material:', e.error.message);
          }
        );
    }
  
    requiresConfirmation(isConfirmed: boolean) {
      this.mensaje = '¿Estás seguro de que quieres actualizar?';
      this.isConfirmed = isConfirmed;
    }
}
