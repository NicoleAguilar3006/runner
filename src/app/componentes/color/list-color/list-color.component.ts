import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Success } from '../../../models/success/success';
import { ColorService } from '../../../service/color/color.service';
import { Color } from '../../../models/color/color';

@Component({
  selector: 'app-list-color',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.css'
})
export class ListColorComponent {

  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listColor: Color[] = [];

  cargoLista: boolean = false;

  constructor(
    private colorService: ColorService,
  ) { }
  
  ngOnInit() : void {
    this.findAllColor();
  }

  findAllColor(): void {
    this.colorService.findAll().subscribe(
      data => {
        this.listColor = data.response;
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }

}
