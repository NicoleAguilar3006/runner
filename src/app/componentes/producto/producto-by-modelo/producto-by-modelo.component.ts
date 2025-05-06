import { Component } from '@angular/core';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { Success } from '../../../models/success/success';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { crearModelo } from '../../../utils/factories';
import { CommonModule } from '@angular/common';
import { ProductoModelo } from '../../../models/producto/producto-modelo';

@Component({
  selector: 'app-producto-by-modelo',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-by-modelo.component.html',
  styleUrl: './producto-by-modelo.component.css'
})
// listProductoByModelo
export class ProductoByModeloComponent {

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  modelo = crearModelo();

  listProducto: ProductoModelo[] = [
    {
      id: 0,
      stock: 0,
      idClr: 0,
      idTll: 0,
      idMdl: 0,
      color: {
        id: 0,
        nombre: ''
      },
      talla: {
        id: 0,
        nombre: ''
      }
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private modeloService: ModeloService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modeloService.listProductoByModelo(id).subscribe(
        response => {
          this.modelo = response.response
          console.log("soy modelo ",this.modelo)
        },
        error => {
          console.error('Error al registrar la categoría:', error);
        }
      )
    } else {
      console.error('ID no encontrado en la URL');
    }
  }
}
