import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoRegistrar } from '../../../models/producto-registrar';
import { Color } from '../../../models/color';
import { Talla } from '../../../models/talla';
import { Modelo } from '../../../models/modelo';
import { ProductoService } from '../../../service/producto.service';
import { ColorService } from '../../../service/color.service';
import { TallaService } from '../../../service/talla.service';
import { ModeloService } from '../../../service/modelo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-productos.component.html',
  styleUrl: './actualizar-productos.component.css'
})
export class ActualizarProductosComponent {
  producto: ProductoRegistrar = {
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
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private colorService: ColorService,
    private tallaService: TallaService,
    private modeloService: ModeloService
  ) { }

  ngOnInit(): void {
    this.cargarColores();
    this.cargarTallas();
    this.cargarModelos();
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    // Obtener el ID del producto desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.buscar(id).subscribe(
        (response) => {
          // Asignamos los datos del producto cargado a la propiedad `producto`
          this.producto = response.response;  // Aquí el `response` debería ser el producto con los valores correctos
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }

  cargarColores(): void {
    this.colorService.listarColores().subscribe(
      (response) => {
        this.colores = response.response;
      },
      (error) => {
        console.error('Error al cargar los colores:', error);
      }
    );
  }

  cargarTallas(): void {
    this.tallaService.listarTallas().subscribe(
      (response) => {
        this.tallas = response.response;
      },
      (error) => {
        console.error('Error al cargar las tallas:', error);
      }
    );
  }

  cargarModelos(): void {
    this.modeloService.listarModelos().subscribe(
      (response) => {
        this.modelos = response.response;
      },
      (error) => {
        console.error('Error al cargar los modelos:', error);
      }
    );
  }

  actualizarProducto(): void {
    this.productoService.actualizar(this.producto.id.toString(), this.producto).subscribe(
      (response) => {
        this.mensajeConfirmacion = 'Producto actualizado con éxito'; 
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/listadoProductos']);
        }, 3000);
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }
}
