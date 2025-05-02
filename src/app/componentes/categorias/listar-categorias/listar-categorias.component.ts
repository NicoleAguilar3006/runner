import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { Success } from '../../../models/success';

@Component({
  selector: 'app-listar-categorias',
  imports: [CommonModule],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.css'
})
export class ListarCategoriasComponent {
      titulo: string = "Cargando...";
      categorias: Success = {
          timestamp: new Date(),
          status: 0,
          success: '',
          response: [],
        };
      cargoLista: boolean = false;
    
    constructor(private categoriaService: CategoriaService) { }

    ngOnInit() : void {
      this.categoriaService.listarCategorias().subscribe(
        data => {
          this.categorias = data;
          this.titulo = 'Listado de categorias';
          this.cargoLista = true;
        }
      );
    }
}
