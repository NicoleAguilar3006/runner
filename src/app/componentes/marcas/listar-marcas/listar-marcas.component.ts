import { Component } from '@angular/core';
import { Success } from '../../../models/success';
import { MarcaService } from '../../../service/marca.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ModeloService } from '../../../service/modelo.service';

@Component({
  selector: 'app-listar-marcas',
  imports: [RouterModule, CommonModule],
  templateUrl: './listar-marcas.component.html',
  styleUrl: './listar-marcas.component.css'
})
export class ListarMarcasComponent {
  titulo: string = "Cargando...";
  marcas: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  cargoLista: boolean = false;
  mensajeConfirmacion: string = '';
  modelosPorMarca: { [id: number]: any[] } = {};


  constructor(
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private router: Router
  ) { }

  ngOnInit() : void {
    this.cargarMarcas();
  }

  cargarMarcas(): void {
    this.marcaService.listarMarcas().subscribe(
      data => {
        this.marcas = data;
        this.titulo = 'Listado de marcas';
        this.cargoLista = true;
        console.log(this.marcas);
      }
    );
  }

  verModelosPorMarca(idMarca: number): void {
    this.modeloService.listarPorIdMarca(idMarca).subscribe(res => {
      // Verificás si la respuesta tiene un response válido
      this.modelosPorMarca[idMarca] = res.response;
    });
  }
  
}
