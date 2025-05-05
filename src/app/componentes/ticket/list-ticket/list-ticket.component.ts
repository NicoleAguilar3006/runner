import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { CategoriaService } from '../../../service/categoria/categoria.service';

@Component({
  selector: 'app-list-ticket',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-ticket.component.html',
  styleUrl: './list-ticket.component.css'
})
export class ListTicketComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listCategorias: Success = this.success;

  cargoLista: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
  ) { }
  ngOnInit() : void {
    this.findAllCategorias();
  }

  findAllCategorias(): void {
    this.categoriaService.findAll().subscribe(
      data => {
        this.listCategorias = data;
      }
    )
  }

}
