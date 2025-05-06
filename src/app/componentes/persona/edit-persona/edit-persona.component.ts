import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Persona } from '../../../models/persona/persona';
import { PersonaService } from '../../../service/persona/persona.service';

@Component({
  selector: 'app-edit-persona',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-persona.component.html',
  styleUrl: './edit-persona.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditPersonaComponent {
form: FormGroup;
persona: Persona = {
    id: 0,
    nombre: ""
  }

  mensaje: string = '';
  isConfirmed: boolean = false;
  isError: boolean = false;
  isSuccessful: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
  
      if (id) {
        this.personaService.findById(id).subscribe(
          response => {
            console.log(response)
            this.persona = response.response;
          },
          error => {
            console.error('Error al registrar el género:', error);
          }
        );
      } else {
        console.error('ID no encontrado en la URL');
      }
    }
  
  
    editPersona() {
      if (this.form.invalid) return;
      this.isConfirmed = false;
  
      const dato: Persona = {
        id: 0,
        nombre: this.form.value.nombre
      }
  
      this.personaService.edit(dato, this.persona.id).
        subscribe(response => {
  
          this.mensaje = 'Género actualizado con éxito';
          this.isSuccessful = true
  
          setTimeout(() => {
            this.router.navigate(['/persona/list']);
          }, 3000);
  
        },
          e => {
            this.isError = true;
            this.mensaje = e.error.message;
            console.error('Error al registrar el género:', e.error.message);
          }
        );
    }
  
    requiresConfirmation(isConfirmed: boolean) {
      this.mensaje = '¿Estás seguro de que quieres actualizar?';
      this.isConfirmed = isConfirmed;
    }
}
