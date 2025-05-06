import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Color } from '../../../models/color/color';
import { ColorService } from '../../../service/color/color.service';

@Component({
  selector: 'app-edit-color',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditColorComponent {
  form: FormGroup;
  color: Color = {
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
    private colorService: ColorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.colorService.findById(id).subscribe(
        response => {
          console.log(response)
          this.color = response.response;
        },
        error => {
          console.error('Error al registrar la categoría:', error);
        }
      );
    } else {
      console.error('ID no encontrado en la URL');
    }
  }


  editColor() {
    if (this.form.invalid) return;
    this.isConfirmed = false;

    const dato: Color = {
      id: 0,
      nombre: this.form.value.nombre
    }

    this.colorService.edit(dato, this.color.id + "").
      subscribe(response => {

        this.mensaje = 'Color actualizado con éxito';
        this.isSuccessful = true

        setTimeout(() => {
          this.router.navigate(['/color/list']);
        }, 3000);

      },
        e => {
          this.isError = true;
          this.mensaje = e.error.message;
          console.error('Error al registrar la categoria:', e.error.message);
        }
      );
  }

  requiresConfirmation(isConfirmed: boolean) {
    this.mensaje = '¿Estas seguro de lo que vas a hacer?';
    this.isConfirmed = isConfirmed;
  }

}
