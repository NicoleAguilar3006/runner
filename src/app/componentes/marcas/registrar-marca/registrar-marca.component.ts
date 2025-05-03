import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../service/marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-marca',
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-marca.component.html',
  styleUrl: './registrar-marca.component.css'
})
export class RegistrarMarcaComponent {
  nuevaMarca: Marca = {
    id: 0,
    nombre: ''
  };

  mensajeConfirmacion: string = '';

  constructor(
    private marcaService: MarcaService,
    private router: Router
  ) { }

  registrarMarca() {
    this.marcaService.registrar(this.nuevaMarca).
      subscribe(response => {
        this.nuevaMarca = {
          id: 0,
          nombre: ''
        };
        this.mensajeConfirmacion = 'Marca registrada con éxito'; 
        
        setTimeout(() => {
          this.router.navigate(['/listadoMarcas']);
        }, 3000);
      },
        error => {
          console.error('Error al registrar la marca:', error);
        }
      );
  }
}
