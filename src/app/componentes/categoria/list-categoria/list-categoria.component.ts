import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Categoria } from '../../../models/categoria/categoria';

@Component({
  selector: 'app-list-categoria',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-categoria.component.html',
  styleUrl: './list-categoria.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
  idCtg: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
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

  deleteCategoria(): void {
    this.isConfirmed = false;
    this.categoriaService.delete(this.idCtg).subscribe(
      data => {
        this.titulo = 'Listado de categorias';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllCategoria()
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
    this.mensaje = '¿Estás seguro de que deseas eliminar esta categoría?';
    this.isConfirmed = isConfirmed;
  }

}
