import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloRegistrar } from '../../../models/modelo-registrar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria/categoria';
import { Marca } from '../../../models/marca/marca';
import { Persona } from '../../../models/persona/persona';
import { Material } from '../../../models/material/material';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { MarcaService } from '../../../service/marca/marca.service';
import { PersonaService } from '../../../service/persona/persona.service';
import { MaterialService } from '../../../service/material/material.service';

@Component({
  selector: 'app-registrar-modelos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-modelo.component.html',
  styleUrl: './registrar-modelo.component.css'
})

export class RegistrarModelosComponent implements OnInit {
  nuevoModelo: ModeloRegistrar = {
 id: 0,
    descripcion: '',
    info: '',
    precio: 0,
    idCtg: 0,
    idMrc: 0,
    idPrn: 0,
    idMtl: 0
  };

  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  personas: Persona[] = [];
  materiales: Material[] = [];
  mensajeConfirmacion: string = '';

  constructor(
    private modeloService: ModeloService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private materialService: MaterialService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.categoriaService.findAll().subscribe(res => this.categorias = res.response);
    this.marcaService.findAll().subscribe(res => this.marcas = res.response);
    this.personaService.findAll().subscribe(res => this.personas = res.response);
    this.materialService.findAll().subscribe(res => this.materiales = res.response);
  }

  registrarModelo(): void {
    this.modeloService.add(this.nuevoModelo).subscribe(
      res => {
        this.mensajeConfirmacion = 'Modelo registrado con éxito';
        this.nuevoModelo = {
          id:0,
          descripcion: '',
          info: '',
          precio: 0,
          idCtg: 0,
          idMrc: 0,
          idPrn: 0,
          idMtl: 0
        };
        setTimeout(() => {
          this.router.navigate(['/listadoModelos']);
        }, 3000);
      },
      err => {
        console.error('Error al registrar modelo:', err);
      }
    );
  }
}
