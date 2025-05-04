import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoRegistrar } from '../../../models/producto-registrar';
import { CommonModule } from '@angular/common';
import { Color } from '../../../models/color/color';
import { Talla } from '../../../models/talla/talla';
import { Modelo } from '../../../models/modelo/modelo';
import { ProductoService } from '../../../service/producto/producto.service';
import { ColorService } from '../../../service/color/color.service';
import { TallaService } from '../../../service/talla/talla.service';
import { ModeloService } from '../../../service/modelo/modelo.service';


@Component({
  selector: 'app-registrar-productos',
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-productos.component.html',
  styleUrl: './registrar-productos.component.css'
})
export class RegistrarProductosComponent {
  nuevoProducto: ProductoRegistrar = {
    id: 0,
    stock: 0,
    idClr: 0,
    idTll: 0,
    idMdl: 0
  };

  colores: Color[] = [];
  tallas: Talla[] = [];
  modelos: Modelo[] = [];
  mensajeConfirmacion: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private colorService: ColorService,
    private tallaService: TallaService,
    private modeloService: ModeloService
  ) { }

  ngOnInit(): void {
    this.cargarColores();
    this.cargarTallas();
    this.cargarModelos();
  }

  cargarColores(): void {
    this.colorService.findAllColores().subscribe(
      (response) => {
        this.colores = response.response;
        console.log(this.colores); 
      },
      (error) => {
        console.error('Error al cargar los colores:', error);
      }
    );
  }

  cargarTallas(): void {
    this.tallaService.findAllTallas().subscribe(
      (response) => {
        this.tallas = response.response;
        console.log(this.tallas); 
      },
      (error) => {
        console.error('Error al cargar las tallas:', error);
      }
    );
  }

  cargarModelos(): void {
    this.modeloService.findAllModelos().subscribe(
      (response) => {
        this.modelos = response.response;
        console.log(this.modelos); 
      },
      (error) => {
        console.error('Error al cargar los modelos:', error);
      }
    );
  }

  registrarProducto() {
    this.productoService.registrar(this.nuevoProducto).
      subscribe(response => {
        this.nuevoProducto = {
          id: 0,
          stock: 0,
          idClr: 0,
          idTll: 0,
          idMdl: 0
        };
        this.mensajeConfirmacion = 'Producto registrado con éxito'; 
        
        setTimeout(() => {
          this.router.navigate(['/listadoProductos']);
        }, 3000);
      },
        error => {
          console.error('Error al registrar el producto:', error);
        }
      );
  }
}
