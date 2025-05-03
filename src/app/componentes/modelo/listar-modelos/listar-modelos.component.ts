import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModeloService } from '../../../service/modelo.service';
import { Success } from '../../../models/success';

@Component({
  selector: 'app-listar-modelos',
  imports: [CommonModule,RouterModule ],
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
  
    constructor(private modeloService: ModeloService) { }
    
      ngOnInit() : void {
        this.modeloService.listarModelos().subscribe(
          data => {
            console.log(data)
            this.modelos = data;
            this.titulo = 'Listado de modelos';
            this.cargoLista = true;
          }
        );
      }
}
