import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { ModeloService } from '../../../service/modelo/modelo.service';

@Component({
  selector: 'app-list-modelo',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-modelo.component.html',
  styleUrl: './list-modelo.component.css'
})
export class ListModeloComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listModelo: Success = this.success;

  cargoLista: boolean = false;

  constructor(
    private modeloService: ModeloService,
  ) { }
  ngOnInit() : void {
    this.findAllModelos();
  }

  findAllModelos(): void {
    this.modeloService.findAll().subscribe(
      data => {
        this.listModelo = data;
      }
    )
  }

}
