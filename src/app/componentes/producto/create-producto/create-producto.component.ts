import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoDTO } from '../../../models/producto/producto-dto';
import { Color } from '../../../models/color/color';
import { Talla } from '../../../models/talla/talla';
import { Modelo } from '../../../models/modelo/modelo';
import { ProductoService } from '../../../service/producto/producto.service';
import { ColorService } from '../../../service/color/color.service';
import { TallaService } from '../../../service/talla/talla.service';
import { ModeloService } from '../../../service/modelo/modelo.service';

@Component({
  selector: 'app-create-producto',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateProductoComponent {
  form: FormGroup;

  producto: ProductoDTO = {
    id: 0,
    stock: 0,
    idClr: 0,
    idTll: 0,
    idMdl: 0,
  };

  titulo: string = '';
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;

  listColor: Color[] = [];
  listTallas: Talla[] = [];
  listModelos: Modelo[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private colorService: ColorService,
    private tallaService: TallaService,
    private modeloService: ModeloService,
  ) {
    this.form = this.fb.group({
      stock: [0, Validators.required],
      idClr: [0, Validators.required],
      idTll: [0, Validators.required],
      idMdl: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.colorService.findAll().subscribe(res => this.listColor = res.response);
    this.tallaService.findAll().subscribe(res => this.listTallas = res.response);
    this.modeloService.findAll().subscribe(res => this.listModelos = res.response);
  }

  saveProducto() {
    if (this.form.invalid) return;
    this.isConfirmed = false;

    const dato: ProductoDTO = {
      id: 0,
      stock: this.form.value.stock,
      idClr: this.form.value.idClr,
      idTll: this.form.value.idTll,
      idMdl: this.form.value.idMdl
    };

    this.productoService.save(dato).

      subscribe(response => {

        this.mensaje = 'Color actualizado con éxito';
        this.isSuccessful = true

        setTimeout(() => {
          this.router.navigate(['/modelo/list']);
        }, 3000);

      },
        e => {
          this.isError = true;
          this.mensaje = e.error.message;
        }
      );
  }

  requiresConfirmation(isConfirmed: boolean) {
    this.mensaje = '¿Estás seguro de que quieres actualizar?';
    this.isConfirmed = isConfirmed;
  }
}
