import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModeloService } from '../../../service/modelo.service';
import { Success } from '../../../models/success';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../service/marca.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-modelos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-modelos.component.html',
  styleUrl: './listar-modelos.component.css'
})
export class ListarModelosComponent {
  titulo: string = "Cargando...";
  modelos: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  cargoLista: boolean = false;
  marcas: Marca[] = [];
  mensajeConfirmacion: string = '';

  idMdlFiltro: number = 0;
  filtroAplicado: boolean = false;

  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMarcas();
    this.cargarModelos();
    this.filtroAplicado = false;
  }

  cargarModelos(): void {
    this.modeloService.listarModelos().subscribe(
      data => {
        this.modelos = data;
        this.titulo = 'Listado de modelos';
        this.cargoLista = true;
      }
    );
  }

  mostrarTodosLasMarcas(): void {
    this.cargarModelos(); 
    this.idMdlFiltro = 0;  
  }

  cargarMarcas(): void {
    this.marcaService.listarMarcas().subscribe(
      (response) => {
        this.marcas = response.response;
        console.log(this.marcas);
      },
      (error) => {
        console.error('Error al cargar las marcas:', error);
      }
    );
  }

  filtrarPorMarca() {
    if (!this.idMdlFiltro || this.idMdlFiltro <= 0) {
      alert("Ingrese un ID válido para la marca.");
      return;
    }
  
    this.modeloService.listarPorIdMarca(this.idMdlFiltro).subscribe({
      next: (resp) => {
        this.modelos = resp; 
        this.cargoLista = true;
        this.filtroAplicado = true;
      },
      error: (err) => {
        console.error(err);
        alert("No se encontraron modelos para esa marca.");
        this.modelos = { timestamp: new Date(), status: 0, success: '', response: [] };  
        this.cargoLista = true;
        this.filtroAplicado = false;
      }
    });
  }

  eliminarModelo(id:string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este modelo?')) {
    this.modeloService.eliminar(id).subscribe(
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