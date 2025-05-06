import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { ColorService } from '../../../service/color/color.service';
import { Color } from '../../../models/color/color';

@Component({
  selector: 'app-list-color',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListColorComponent {

  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };
  idClr: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;

  listColor: Color[] = [];

  cargoLista: boolean = false;

  constructor(
    private colorService: ColorService,
  ) { }
  
  ngOnInit() : void {
    this.findAllColor();
  }

  findAllColor(): void {
    this.colorService.findAll().subscribe(
      data => {
        this.listColor = data.response;
        this.titulo = 'Listado de colores';
        this.cargoLista = true;
      }
    )
  }

  deleteColor(): void {
    this.isConfirmed = false;
    this.colorService.delete(this.idClr).subscribe(
      data => {
        this.titulo = 'Listado de colores';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllColor()
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
    this.mensaje = '¿Estás seguro de que deseas eliminar este color?';
    this.isConfirmed = isConfirmed;
  }
}
