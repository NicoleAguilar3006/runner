import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PersonaService } from '../../../service/persona/persona.service';
import { Persona } from '../../../models/persona/persona';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-persona',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './create-persona.component.html',
  styleUrl: './create-persona.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePersonaComponent {
  form: FormGroup;
  
  mensaje: string = '';
  isError: boolean = false;
  isSuccessful: boolean = false;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  registrarPersona() {
            if (this.form.invalid) return;
            
            const dato: Persona = {
              id : 0,
              nombre : this.form.value.nombre
            }
        
            this.personaService.add(dato).
              subscribe(response => {
                this.isSuccessful = true
                this.mensaje = 'Persona registrada con éxito'; 
                
                setTimeout(() => {
                  this.router.navigate(['/persona/list']);
                }, 3000);
              },
                e => {
                  this.isError = true;
                  this.mensaje = e.error.message;
                }
              );
          }
}
