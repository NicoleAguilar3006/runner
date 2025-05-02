import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../models/producto/producto';
import { ProductoService } from '../../../service/producto.service';
import { ProductoResponse } from '../../../models/producto-response';
import { Success } from '../../../models/success/success';

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})

export class ListarProductosComponent {

  titulo: string = "Cargando...";
  productos: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };
  cargoLista: boolean = false;
  mensajeConfirmacion: string = '';

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe(
      data => {
        this.productos = data;
        this.titulo = 'Listado de productos';
        this.cargoLista = true;

        console.log(this.productos);
      }
    );
  }
}
