import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  imports: [FormsModule, CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})

export class PruebaComponent {
  selectedColors: string[] = [];
  selectedSizes: number[] = [];

  colors = ['Rojo', 'Azul', 'Verde', 'Amarillo'];
  sizes = [1, 2, 3, 4];

  onColorChange(color: string, event: any) {
    if (event.target.checked) {
      this.selectedColors.push(color);
    } else {
      const index = this.selectedColors.indexOf(color);
      if (index > -1) {
        this.selectedColors.splice(index, 1);
      }
    }
  }

  onSizeChange(size: number, event: any) {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      const index = this.selectedSizes.indexOf(size);
      if (index > -1) {
        this.selectedSizes.splice(index, 1);
      }
    }
  }

  submitForm() {
    console.log('Colores seleccionados:', this.selectedColors);
    console.log('Tallas seleccionadas:', this.selectedSizes);
  }
}
