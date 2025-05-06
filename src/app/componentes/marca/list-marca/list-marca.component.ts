import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Success } from '../../../models/success/success';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarcaService } from '../../../service/marca/marca.service';
import { Marca } from '../../../models/marca/marca';

@Component({
  selector: 'app-list-marca',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-marca.component.html',
  styleUrl: './list-marca.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListMarcaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  idMrc: number = 0;
  mensaje: string = '';
  listMarca: Marca[] = [];
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
  cargoLista: boolean = false;

  constructor(
    private marcaService: MarcaService,
  ) { }
  ngOnInit() : void {
    this.findAllMarca();
  }

  findAllMarca(): void {
    this.marcaService.findAll().subscribe(
      data => {
        this.listMarca = data.response;
        this.titulo = 'Listado de marcas';
        this.cargoLista = true;
      }
    )
  }

  deleteMarca(): void {
    this.isConfirmed = false;
    this.marcaService.delete(this.idMrc).subscribe(
      data => {
        this.titulo = 'Listado de marcas';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllMarca()
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
    this.mensaje = '¿Estás seguro de que deseas eliminar esta marca?';
    this.isConfirmed = isConfirmed;
  }

}
