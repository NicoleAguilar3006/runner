import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Success } from '../../../models/success/success';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TallaService } from '../../../service/talla/talla.service';
import { Talla } from '../../../models/talla/talla';

@Component({
  selector: 'app-list-talla',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-talla.component.html',
  styleUrl: './list-talla.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListTallaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listTallas: Talla[] = [];
  idTll: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
  cargoLista: boolean = false;


  constructor(
    private tallaService: TallaService,
  ) { }
  
  ngOnInit() : void {
    this.findAllTallas();
  }

  findAllTallas(): void {
    this.tallaService.findAll().subscribe(
      data => {
        this.listTallas = data.response;
        this.titulo = 'Listado de tallas';
        this.cargoLista = true;
      }
    )
  }

  deleteTalla(): void {
    this.isConfirmed = false;
    this.tallaService.delete(this.idTll).subscribe(
      data => {
        this.titulo = 'Listado de tallas';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllTallas()
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
    this.mensaje = '¿Estás seguro de que deseas eliminar esta talla?';
    this.isConfirmed = isConfirmed;
  }

}
