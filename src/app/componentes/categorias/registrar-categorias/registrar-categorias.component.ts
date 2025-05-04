import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria/categoria';
import { CategoriaService } from '../../../service/categoria/categoria.service';


@Component({
  selector: 'app-registrar-categorias',
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-categorias.component.html',
  styleUrl: './registrar-categorias.component.css'
})
export class RegistrarCategoriasComponent {
  nuevaCategoria: Categoria = {
    id: 0,
    nombre: ''
  };

  mensajeConfirmacion: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  registrarCategoria() {
    this.categoriaService.registrar(this.nuevaCategoria).
      subscribe(response => {
        this.nuevaCategoria = {
          id: 0,
          nombre: ''
        };
        this.mensajeConfirmacion = 'Categoria registrada con éxito'; 
        
        setTimeout(() => {
          this.router.navigate(['/listadoCategorias']);
        }, 3000);
      },
        error => {
          console.error('Error al registrar la categoria:', error);
        }
      );
  }
}
