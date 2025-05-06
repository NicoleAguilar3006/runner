import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { ModeloDTO } from '../../../models/modelo/modeloDTO/modelo-dto';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { MarcaService } from '../../../service/marca/marca.service';
import { PersonaService } from '../../../service/persona/persona.service';
import { MaterialService } from '../../../service/material/material.service';
import { Categoria } from '../../../models/categoria/categoria';
import { Marca } from '../../../models/marca/marca';
import { Persona } from '../../../models/persona/persona';
import { Material } from '../../../models/material/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-modelo',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-modelo.component.html',
  styleUrl: './edit-modelo.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditModeloComponent {
  form: FormGroup;
  modelo: ModeloDTO = {
    id: 0,
    descripcion: '',
    info: '',
    precio: 0,
    idCtg: 0,
    idMrc: 0,
    idPrn: 0,
    idMtl: 0
  };

  titulo: string = '';
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;

  listCategorias: Categoria[] = [];
  listMarcas: Marca[] = [];
  listPersonas: Persona[] = [];
  listMateriales: Material[] = [];
  listMensajeConfirmacion: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private modeloService: ModeloService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private materialService: MaterialService
  ) {
    this.form = this.fb.group({
      nombre: [0, Validators.required],
      descripcion: [0, Validators.required],
      info: [0, Validators.required],
      precio: [0, Validators.required],
      idCtg: [0, Validators.required],
      idMrc: [0, Validators.required],
      idPrn: [0, Validators.required],
      idMtl: [0, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modeloService.findById(id).subscribe(
        response => {
          this.modelo = response.response;
          this.cargarDatos();
        },
        error => {
          console.error('Error al registrar la categoría:', error);
        }
      );
    } else {
      console.error('ID no encontrado en la URL');
    }
  }

  cargarDatos(): void {
    this.categoriaService.findAll().subscribe(res => this.listCategorias = res.response);
    this.marcaService.findAll().subscribe(res => this.listMarcas = res.response);
    this.personaService.findAll().subscribe(res => this.listPersonas = res.response);
    this.materialService.findAll().subscribe(res => this.listMateriales = res.response);
  }

  editModelo() {
    if (this.form.invalid) return;
    this.isConfirmed = false;

    const dato: ModeloDTO = {
      id: 0,
      descripcion: this.form.value.descripcion,
      info: this.form.value.info,
      precio: this.form.value.precio,
      idCtg: this.form.value.idCtg,
      idMrc: this.form.value.idMrc,
      idPrn: this.form.value.idPrn,
      idMtl: this.form.value.idMtl
    };

    this.modeloService.edit(dato, this.modelo.id).

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
