import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Success } from '../../../models/success/success';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonaService } from '../../../service/persona/persona.service';
import { Persona } from '../../../models/persona/persona';

@Component({
  selector: 'app-list-persona',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-persona.component.html',
  styleUrl: './list-persona.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListPersonaComponent {
  titulo: string = "Cargando...";

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  idPrs: number = 0;
  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;
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
        this.titulo = 'Listado de géneros';
        this.cargoLista = true;
      }
    )
  }
  deletePersona(): void {
    this.isConfirmed = false;
    this.personaService.delete(this.idPrs).subscribe(
      data => {
        this.titulo = 'Listado de géneros';
        this.mensaje = data.response;
        this.isSuccessful = true
        this.findAllPersonas()
        setTimeout(() => {;
          this.isSuccessful = false
        }, 2000);
      },
      e => {
        this.isError = true;
        this.mensaje = e.error.message;
      }
    )
  }

  requiresConfirmation(isConfirmed: boolean) {
    this.mensaje = '¿Estás seguro de que deseas eliminar este género?';
    this.isConfirmed = isConfirmed;
  }

}
