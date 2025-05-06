import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from '../../../service/persona/persona.service';
import { Persona } from '../../../models/persona/persona';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-persona',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-persona.component.html',
  styleUrl: './create-persona.component.css'
})
export class CreatePersonaComponent {
  form: FormGroup;
  mensajeConfirmacion: string = '';
  titulo: string = 'Género'; 

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  registrarPersona() {
    if (this.form.invalid) return;

    const dato: Persona = {
      id: 0,
      nombre: this.form.value.nombre
    };

    this.personaService.add(dato).subscribe(
      response => {
        this.mensajeConfirmacion = 'Persona registrada con éxito';

        setTimeout(() => {
          this.router.navigate(['/listadoPersonas']);
        }, 3000);
      },
      error => {
        console.error('Error al registrar la persona:', error);
      }
    );
  }
}
