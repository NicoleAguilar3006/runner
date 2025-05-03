import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloRegistrar } from '../../../models/modelo-registrar';
import { CategoriaService } from '../../../service/categoria.service';
import { MarcaService } from '../../../service/marca.service';
import { PersonaService } from '../../../service/persona.service';
import { MaterialService } from '../../../service/material.service';
import { ModeloService } from '../../../service/modelo.service';
import { Categoria } from '../../../models/categoria';
import { Marca } from '../../../models/marca';
import { Persona } from '../../../models/persona';
import { Material } from '../../../models/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-actualizar-modelo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-modelo.component.html',
  styleUrl: './actualizar-modelo.component.css'
})
export class ActualizarModeloComponent {
  modelo: ModeloRegistrar = {
    id:0,
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
    private route: ActivatedRoute,
    private router: Router,
    private modeloService: ModeloService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarMarcas();
    this.cargarPersonas();
    this.cargarMateriales();
    this.obtenerModelo();
  }

  obtenerModelo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modeloService.buscar(id).subscribe(
        (response) => {
          console.log(response)
          this.modelo = response.response;  
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }


  
  cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe(
      (response) => {
        this.categorias = response.response;
      },
      (error) => {
        console.error('Error al cargar los categorias:', error);
      }
    );
  }

  
  cargarMarcas(): void {
    this.marcaService.listarMarcas().subscribe(
      (response) => {
        this.marcas = response.response;
      },
      (error) => {
        console.error('Error al cargar los marcas:', error);
      }
    );
  }

  
  cargarPersonas(): void {
    this.personaService.listarPersonas().subscribe(
      (response) => {
        this.personas = response.response;
      },
      (error) => {
        console.error('Error al cargar los personas:', error);
      }
    );
  }


  cargarMateriales(): void {
    this.materialService.listarMateriales().subscribe(
      (response) => {
        this.materiales = response.response;
      },
      (error) => {
        console.error('Error al cargar los materiales:', error);
      }
    );
  }



  actualizar(): void {
    this.modeloService.actualizarModelo(this.modelo.id, this.modelo).subscribe(
    
      (response) => {
        this.mensajeConfirmacion = 'Modelo actualizado con éxito'; 
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/listadoModelos']);
        }, 3000);
      },
      (error) => {
        console.error('Error al actualizar el modelo:', error);
      }
    );
  }
}
