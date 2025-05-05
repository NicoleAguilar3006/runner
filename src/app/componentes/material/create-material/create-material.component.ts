import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../../service/material/material.service';
import { Router } from '@angular/router';
import { Material } from '../../../models/material/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-material',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-material.component.html',
  styleUrl: './create-material.component.css'
})
export class CreateMaterialComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  registrarMaterial() {
    if (this.form.invalid) return;

    const dato: Material = {
      id: 0,
      nombre: this.form.value.nombre
    };

    this.materialService.add(dato).subscribe(
      response => {
        this.mensajeConfirmacion = 'Material registrado con éxito';

        setTimeout(() => {
          this.router.navigate(['/listadoMateriales']);
        }, 3000);
      },
      error => {
        console.error('Error al registrar el material:', error);
      }
    );
  }
}
