import { Component } from '@angular/core';
import { ProductoService } from '../../../service/producto/producto.service';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { Success } from '../../../models/success/success';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { MarcaService } from '../../../service/marca/marca.service';
import { PersonaService } from '../../../service/persona/persona.service';
import { MaterialService } from '../../../service/material/material.service';
import { TallaService } from '../../../service/talla/talla.service';
import { ColorService } from '../../../service/color/color.service';
import { Producto } from '../../../models/producto/producto';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FiltroProducto } from '../../../models/producto/filtro-producto';
import { AccountService } from '../../../service/account/account.service';
import { DistritoService } from '../../../service/distrito/distrito.service';

@Component({
  selector: 'app-filtrar',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './filtrar.component.html',
  styleUrl: './filtrar.component.css'
})
export class FiltrarComponent {
  
  signupForm: FormGroup;

  filtroProducto: FiltroProducto = {
    idClr: 0,
    idTll: 0,
    idCtg: 0,
    idMrc: 0,
    idPrn: 0,
    idMtl: 0
  }
  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listProducto: Success = this.success;
  listCategorias: Success = this.success;
  listMarcas: Success = this.success;
  listPersonas: Success = this.success;
  listMateriales: Success = this.success;
  listTallas: Success = this.success;
  listColores: Success = this.success;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private materialService: MaterialService,
    private tallaService: TallaService,
    private colorService: ColorService,
    private router: Router,
    private fb: FormBuilder,
  ) {     
    this.signupForm = this.fb.group({
    idClr: [0, Validators.required],
    idTll: [0, Validators.required],
    idCtg: [0, Validators.required],
    idMrc: [0, Validators.required],
    idPrn: [0, Validators.required],
    idMtl: [0, Validators.required],
  });

  }


  ngOnInit(): void {
    this.findAllProductos();
    this.findAllCategoria();
    this.findAllMarca();
    this.findAllPersona();
    this.findAllMaterial();
    this.findAllTalla();
    this.findAllColor();
  }

  findAllProductos(): void {
    this.productoService.findAllProductos().subscribe(
      data => {
        this.listProducto = data;
      }
    )
  }

  findAllCategoria(): void {
    this.categoriaService.findAllCategorias().subscribe(
      data => {
        this.listCategorias = data;
      }
    )
  }
  findAllMarca(): void {
    this.marcaService.findAllMarcas().subscribe(
      data => {
        this.listMarcas = data;
      }
    )
  }
  findAllPersona(): void {
    this.personaService.findAllPersonas().subscribe(
      data => {
        this.listPersonas = data;
      }
    )
  }
  findAllMaterial(): void {
    this.materialService.findAllMateriales().subscribe(
      data => {
        this.listMateriales = data;
      }
    )
  }
  findAllTalla(): void {
    this.tallaService.findAllTallas().subscribe(
      data => {
        this.listTallas = data;
      }
    )
  }
  findAllColor(): void {
    this.colorService.findAllColores().subscribe(
      data => {
        this.listColores = data;
      }
    )
  }


  findByAttributes(): void {
    this.productoService.findByAttributes(this.filtroProducto).subscribe(
      data => {
        this.listTallas = data;
      }
    )
  }

   onSubmit() {
      if (this.signupForm.invalid) return;
  
      const data: FiltroProducto = {
        idClr: this.signupForm.value.idClr,
        idTll: this.signupForm.value.idTll,
        idCtg: this.signupForm.value.idCtg,
        idMrc: this.signupForm.value.idMrc,
        idPrn: this.signupForm.value.idPrn,
        idMtl: this.signupForm.value.idMtl
      }
  
      
      //const data: FiltroProducto = this.signupForm.value;
  
      console.log(data)
      this.productoService.findByAttributes(data).subscribe(
        (res) => {
          console.log(res.response)
          this.listProducto = res;
        },
        (err) => {
          console.log(err.error.message)
        }
      );
    }

}
