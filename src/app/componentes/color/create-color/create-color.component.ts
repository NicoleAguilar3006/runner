import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Router, RouterLink } from '@angular/router';
import { Color } from '../../../models/color/color';
import { ColorService } from '../../../service/color/color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-color',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './create-color.component.html',
  styleUrl: './create-color.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CreateColorComponent {
  form: FormGroup;

  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;

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
      id: 0,
      nombre: this.form.value.nombre
    }

    this.colorService.add(dato).
      subscribe(response => {

        this.isSuccessful = true
        this.mensaje = 'Color registrado con éxito'; 
        

        setTimeout(() => {
          this.router.navigate(['/color/list']);
        }, 3000);
      },
        e => {
          this.isError = true;
          this.mensaje = e.error.message;
        }
      );
  }
}
