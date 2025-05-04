import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { CategoriaService } from '../../../service/categoria/categoria.service';

@Component({
  selector: 'app-listar-categorias',
  imports: [CommonModule, RouterLink],
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
      this.categoriaService.findAllCategorias().subscribe(
        data => {
          this.categorias = data;
          this.titulo = 'Listado de categorias';
          this.cargoLista = true;
        }
      );
    }
}
