import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../service/producto/producto.service';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { Modelo } from '../../../models/modelo/modelo';
import { Success } from '../../../models/success/success';

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule, RouterModule, FormsModule],
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
  modelos: Modelo[] = [];

  idMdlFiltro: number = 0;
  filtroAplicado: boolean = false;
    

  constructor(
    private productoService: ProductoService,
    private modeloService: ModeloService,   
    private router: Router,
  ) { }

  ngOnInit() : void {
    this.cargarProductos();
    this.cargarModelos(); 
    this.filtroAplicado = false;
  }

  cargarProductos(): void {

    this.productoService.findAllProductos().subscribe(
      data => {
        this.productos = data;
        this.titulo = 'Listado de productos';
        this.cargoLista = true;
        console.log(this.productos);
        this.filtroAplicado = false;
      }
    );
  }

  mostrarTodosLosProductos(): void {
    this.cargarProductos(); 
    this.idMdlFiltro = 0;  
  }

  cargarModelos(): void {
    this.modeloService.findAll().subscribe(
      (response) => {
        this.modelos = response.response;
        console.log(this.modelos); 
      },
      (error) => {
        console.error('Error al cargar los modelos:', error);
      }
    );
  }

  filtrarPorModelo() {
    if (!this.idMdlFiltro || this.idMdlFiltro <= 0) {
      alert("Ingrese un ID válido para el modelo.");
      return;
    }
  
    this.productoService.listarPorIdModelo(this.idMdlFiltro).subscribe({
      next: (resp) => {
        this.productos = resp; 
        this.cargoLista = true;
        this.filtroAplicado = true;
      },
      error: (err) => {
        console.error(err);
        alert("No se encontraron productos para ese modelo.");
        this.productos = { timestamp: new Date(), status: 0, success: '', response: [] };  
        this.cargoLista = true;
        this.filtroAplicado = false;
      }
    });
  }

  eliminarProducto(id:string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    this.productoService.delete(id).subscribe(
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