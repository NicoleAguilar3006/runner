import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../../service/producto.service';
import { Success } from '../../../models/success';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule, RouterModule],
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
    private productoService: ProductoService,   
    private router: Router,
  ) { }

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

  eliminarProducto(id:string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    this.productoService.eliminar(id).subscribe(
      (response) => {
        this.mensajeConfirmacion = 'Producto eliminado con éxito'; 
        console.log(response);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
  }
}