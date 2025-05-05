import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { DistritoService } from '../../../service/distrito/distrito.service';
import { Distrito } from '../../../models/distrito/distrito';

@Component({
  selector: 'app-list-distrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-distrito.component.html',
  styleUrl: './list-distrito.component.css'
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
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }

}
