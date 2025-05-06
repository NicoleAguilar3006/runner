import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { Router, RouterLink } from '@angular/router';
import { Modelo } from '../../../models/modelo/modelo';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { MarcaService } from '../../../service/marca/marca.service';
import { PersonaService } from '../../../service/persona/persona.service';
import { MaterialService } from '../../../service/material/material.service';
import { Categoria } from '../../../models/categoria/categoria';
import { Marca } from '../../../models/marca/marca';
import { Persona } from '../../../models/persona/persona';
import { Material } from '../../../models/material/material';
import { CommonModule } from '@angular/common';
import { ModeloDTO } from '../../../models/modelo/modeloDTO/modelo-dto';

@Component({
  selector: 'app-create-modelo',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-modelo.component.html',
  styleUrl: './create-modelo.component.css'
})
export class CreateModeloComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';
  titulo: string = 'Nuevo modelo '; 

  listCategorias: Categoria[] = [];
  listMarcas: Marca[] = [];
  listPersonas: Persona[] = [];
  listMateriales: Material[] = [];
  listMensajeConfirmacion: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modeloService: ModeloService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private materialService: MaterialService
  ) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      info: ['', Validators.required],
      precio: ['', Validators.required],
      idCtg: ['', Validators.required],
      idMrc: ['', Validators.required],
      idPrn: ['', Validators.required],
      idMtl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.categoriaService.findAll().subscribe(res => this.listCategorias = res.response);
    this.marcaService.findAll().subscribe(res => this.listMarcas = res.response);
    this.personaService.findAll().subscribe(res => this.listPersonas = res.response);
    this.materialService.findAll().subscribe(res => this.listMateriales = res.response);
  }


  registrarModelo() {
    if (this.form.invalid) return;

    const dato: ModeloDTO = {
      descripcion: this.form.value.descripcion,
      info: this.form.value.info,
      precio: this.form.value.precio,
      idCtg: this.form.value.idCtg,
      idMrc: this.form.value.idMrc,
      idPrn: this.form.value.idPrn,
      idMtl: this.form.value.idMtl
    };

    console.log(dato)
    
    //this.modeloService.add(dato).subscribe(
    //  response => {
    //    this.mensajeConfirmacion = 'Modelo registrado con éxito';
//
    //    setTimeout(() => {
    //      this.router.navigate(['/listadoModelos']);
    //    }, 3000);
    //  },
    //  error => {
    //    console.error('Error al registrar el modelo:', error);
    //  }
    //);
  }
}
