import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Categoria } from '../../../models/categoria/categoria';

@Component({
  selector: 'app-list-categoria',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-categoria.component.html',
  styleUrl: './list-categoria.component.css'
})
export class ListCategoriaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listCategorias: Categoria[] = [];

  cargoLista: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
  ) { }
  ngOnInit(): void {
    this.findAllCategoria();
  }

  findAllCategoria(): void {
    this.categoriaService.findAll().subscribe(
      data => {
        this.listCategorias = data.response;
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }
}
