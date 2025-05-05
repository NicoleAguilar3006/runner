import { Component } from '@angular/core';
import { Success } from '../../../models/success/success';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TallaService } from '../../../service/talla/talla.service';
import { Talla } from '../../../models/talla/talla';

@Component({
  selector: 'app-list-talla',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-talla.component.html',
  styleUrl: './list-talla.component.css'
})
export class ListTallaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listTallas: Talla[] = [];

  cargoLista: boolean = false;

  constructor(
    private tallaService: TallaService,
  ) { }
  
  ngOnInit() : void {
    this.findAllTallas();
  }

  findAllTallas(): void {
    this.tallaService.findAll().subscribe(
      data => {
        this.listTallas = data.response;
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }

}
