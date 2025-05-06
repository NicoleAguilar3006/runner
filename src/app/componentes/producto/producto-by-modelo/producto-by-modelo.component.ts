import { Component } from '@angular/core';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { Success } from '../../../models/success/success';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-by-modelo',
  imports: [],
  templateUrl: './producto-by-modelo.component.html',
  styleUrl: './producto-by-modelo.component.css'
})
// listProductoByModelo
export class ProductoByModeloComponent {

  success: Success = {
    timestamp: new Date(),
    status: 0,
    success: '',
    response: [],
  };

  listModelo: Success = this.success;

  constructor(
    private route: ActivatedRoute,
    private modeloService: ModeloService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modeloService.listProductoByModelo(id).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.error('Error al registrar la categoría:', error);
        }
      )
    } else {
      console.error('ID no encontrado en la URL');
    }
  }
}
