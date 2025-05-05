import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { MaterialService } from '../../../service/material/material.service';
import { Material } from '../../../models/material/material';

@Component({
  selector: 'app-list-material',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-material.component.html',
  styleUrl: './list-material.component.css'
})
export class ListMaterialComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listMaterial: Material[] = [];

  cargoLista: boolean = false;

  constructor(
    private materialService: MaterialService,
  ) { }
  
  ngOnInit() : void {
    this.findAllMateriales();
  }

  findAllMateriales(): void {
    this.materialService.findAll().subscribe(
      data => {
        this.listMaterial = data.response;
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }

}
