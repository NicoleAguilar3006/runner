import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../service/categoria/categoria.service';
import { Router } from 'express';

@Component({
  selector: 'app-edit-categoria',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditCategoriaComponent {

}
