import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { DistritoService } from '../../../service/distrito/distrito.service';
import { Distrito } from '../../../models/distrito/distrito';

@Component({
  selector: 'app-list-distrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-distrito.component.html',
  styleUrl: './list-distrito.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListDistritoComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listDistrito: Distrito[] = [];
  idDis: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
  cargoLista: boolean = false;

  constructor(
    private distritoService: DistritoService,
  ) { }
  ngOnInit() : void {
    this.findAllDistrito();
  }

  findAllDistrito(): void {
    this.distritoService.findAll().subscribe(
      data => {
        this.listDistrito = data.response;
        this.titulo = 'Listado de distritos';
        this.cargoLista = true;
      }
    )
  }

  deleteDistrito(): void {
    this.isConfirmed = false;
    this.distritoService.delete(this.idDis).subscribe(
      data => {
        this.titulo = 'Listado de distritos';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllDistrito()
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
    this.mensaje = '¿Estás seguro de que deseas eliminar este distrito?';
    this.isConfirmed = isConfirmed;
  }
}
