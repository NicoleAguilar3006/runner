import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../service/producto.service';
import { ProductoResponse } from '../../../models/producto-response';

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent {

  titulo: string = "Cargando...";
  productos: ProductoResponse = {
    mensaje: '',
    fecha: new Date(),
    status: '',
    Productos: []
  };
  
  cargoLista: boolean = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit() : void {
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
