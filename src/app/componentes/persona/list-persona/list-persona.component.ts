import { Component } from '@angular/core';
import { Success } from '../../../models/success/success';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonaService } from '../../../service/persona/persona.service';
import { Persona } from '../../../models/persona/persona';

@Component({
  selector: 'app-list-persona',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-persona.component.html',
  styleUrl: './list-persona.component.css'
})
export class ListPersonaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listPersonas: Persona[] = [];

  cargoLista: boolean = false;

  constructor(
    private personaService: PersonaService,
  ) { }
  ngOnInit() : void {
    this.findAllPersonas();
  }

  findAllPersonas(): void {
    this.personaService.findAll().subscribe(
      data => {
        this.listPersonas = data.response;
        this.titulo = 'Listado de categorias';
        this.cargoLista = true;
      }
    )
  }

}
