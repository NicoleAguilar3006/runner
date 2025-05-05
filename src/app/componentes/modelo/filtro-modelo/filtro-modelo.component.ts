import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../service/producto/producto.service';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { MarcaService } from '../../../service/marca/marca.service';
import { PersonaService } from '../../../service/persona/persona.service';
import { MaterialService } from '../../../service/material/material.service';
import { TallaService } from '../../../service/talla/talla.service';
import { ColorService } from '../../../service/color/color.service';
import { Success } from '../../../models/success/success';
import { FiltroModelo } from '../../../models/modelo/filtro-modelo';
import { ModeloService } from '../../../service/modelo/modelo.service';

@Component({
  selector: 'app-filtro-modelo',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './filtro-modelo.component.html',
  styleUrl: './filtro-modelo.component.css'
})
export class FiltroModeloComponent {

  selectedColores: number[] = [];
  selectedTallas: number[] = [];
  selectedCategorias: number[] = [];
  selectedMarcas: number[] = [];
  selectedPersonas: number[] = [];
  selectedMateriales: number[] = [];

  onColorChange(color: number, event: any) {
    if (event.target.checked) {
      this.selectedColores.push(color);
    } else {
      const index = this.selectedColores.indexOf(color);
      if (index > -1) {
        this.selectedColores.splice(index, 1);
      }
    }
  }
  onTallaChange(talla: number, event: any) {
    if (event.target.checked) {
      this.selectedTallas.push(talla);
    } else {
      const index = this.selectedTallas.indexOf(talla);
      if (index > -1) {
        this.selectedTallas.splice(index, 1);
      }
    }
  }
  onCategoriaChange(categoria: number, event: any) {
    if (event.target.checked) {
      this.selectedCategorias.push(categoria);
    } else {
      const index = this.selectedCategorias.indexOf(categoria);
      if (index > -1) {
        this.selectedCategorias.splice(index, 1);
      }
    }
  }
  onMarcaChange(marca: number, event: any) {
    if (event.target.checked) {
      this.selectedMarcas.push(marca);
    } else {
      const index = this.selectedMarcas.indexOf(marca);
      if (index > -1) {
        this.selectedMarcas.splice(index, 1);
      }
    }
  }
  onPersonaChange(persona: number, event: any) {
    if (event.target.checked) {
      this.selectedPersonas.push(persona);
    } else {
      const index = this.selectedPersonas.indexOf(persona);
      if (index > -1) {
        this.selectedPersonas.splice(index, 1);
      }
    }
  }
  onMaterialChange(material: number, event: any) {
    if (event.target.checked) {
      this.selectedMateriales.push(material);
    } else {
      const index = this.selectedMateriales.indexOf(material);
      if (index > -1) {
        this.selectedMateriales.splice(index, 1);
      }
    }
  }
  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listCategorias: Success = this.success;
  listMarcas: Success = this.success;
  listPersonas: Success = this.success;
  listMateriales: Success = this.success;
  listTallas: Success = this.success;
  listColores: Success = this.success;
  listModelo: Success = this.success;

  constructor(
    private modeloService: ModeloService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private materialService: MaterialService,
    private tallaService: TallaService,
    private colorService: ColorService,
  ) { }


  ngOnInit(): void {
    this.findAllCategoria();
    this.findAllMarca();
    this.findAllPersona();
    this.findAllMaterial();
    this.findAllTalla();
    this.findAllColor();
    this.findByAttributes(); 
  }


  findAllCategoria(): void {
    this.categoriaService.findAll().subscribe(
      data => {
        this.listCategorias = data;
      }
    )
  }
  findAllMarca(): void {
    this.marcaService.findAll().subscribe(
      data => {
        this.listMarcas = data;
      }
    )
  }
  findAllPersona(): void {
    this.personaService.findAll().subscribe(
      data => {
        this.listPersonas = data;
      }
    )
  }
  findAllMaterial(): void {
    this.materialService.findAll().subscribe(
      data => {
        this.listMateriales = data;
      }
    )
  }
  findAllTalla(): void {
    this.tallaService.findAll().subscribe(
      data => {
        this.listTallas = data;
      }
    )
  }
  findAllColor(): void {
    this.colorService.findAll().subscribe(
      data => {
        this.listColores = data;
      }
    )
  }


  findByAttributes(): void {
    const data: FiltroModelo = {
      idClr: this.selectedColores,
      idTll: this.selectedTallas,
      idCtg: this.selectedCategorias,
      idMrc: this.selectedMarcas,
      idPrn: this.selectedPersonas,
      idMtl: this.selectedMateriales
    };

    this.modeloService.findByAttributes(data).subscribe(
      (response) => {
        console.log(response);
        this.listModelo = response
      },
      (e) => {
        console.error(e.error.message);
      }
    );
  }
}
