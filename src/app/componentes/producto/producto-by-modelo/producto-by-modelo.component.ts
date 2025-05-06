import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { Success } from '../../../models/success/success';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { crearModelo } from '../../../utils/factories';
import { CommonModule } from '@angular/common';
import { ProductoModelo } from '../../../models/producto/producto-modelo';
import { ProductoService } from '../../../service/producto/producto.service';

@Component({
  selector: 'app-producto-by-modelo',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-by-modelo.component.html',
  styleUrl: './producto-by-modelo.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
  id: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
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
    private modeloService: ModeloService,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.listProductoByModelo(id);
    } else {
      console.error('ID no encontrado en la URL');
    }
  }
  listProductoByModelo(id:string){
    this.modeloService.listProductoByModelo(id).subscribe(
      response => {
        this.modelo = response.response
        console.log("soy modelo ",this.modelo)
      },
      error => {
        console.error('Error:', error);
      }
    )
  }
}
