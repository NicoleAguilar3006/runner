import { Component } from '@angular/core';
import { Success } from '../../../models/success/success';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarcaService } from '../../../service/marca/marca.service';
import { Marca } from '../../../models/marca/marca';

@Component({
  selector: 'app-list-marca',
  imports: [CommonModule],
  templateUrl: './list-marca.component.html',
  styleUrl: './list-marca.component.css'
})
export class ListMarcaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listMarca: Marca[] = [];

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
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }

}
