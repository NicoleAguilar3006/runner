import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../../service/material/material.service';
import { Router, RouterLink } from '@angular/router';
import { Material } from '../../../models/material/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-material',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './create-material.component.html',
  styleUrl: './create-material.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateMaterialComponent {
  form: FormGroup;

  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;

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
    }

    this.materialService.add(dato).
      subscribe(response => {
        this.isSuccessful = true
        this.mensaje = 'Material registrado con éxito';

        setTimeout(() => {
          this.router.navigate(['/material/list']);
        }, 3000);
      },
        e => {
          this.isError = true;
          this.mensaje = e.error.message;
        }
      );
  }
}
