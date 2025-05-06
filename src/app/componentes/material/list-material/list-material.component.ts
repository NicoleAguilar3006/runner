import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { MaterialService } from '../../../service/material/material.service';
import { Material } from '../../../models/material/material';

@Component({
  selector: 'app-list-material',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-material.component.html',
  styleUrl: './list-material.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
  idMtr: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
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
        this.titulo = 'Listado de materiales';
        this.cargoLista = true;
      }
    )
  }

  deleteMaterial(): void {
    this.isConfirmed = false;
    this.materialService.delete(this.idMtr).subscribe(
      data => {
        this.titulo = 'Listado de materiales';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllMateriales()
        setTimeout(() => {;
          this.isSuccessful = false
        }, 2000);
      },
      e => {
        this.isError = true;
        this.mensaje = e.error.message;
      }
    )
  }

  requiresConfirmation(isConfirmed: boolean) {
    this.mensaje = '¿Estás seguro de que deseas eliminar esta material?';
    this.isConfirmed = isConfirmed;
  }

}
