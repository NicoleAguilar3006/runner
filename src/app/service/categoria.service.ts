import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Success } from '../models/success';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlBase = 'http://localhost:8080/api/categoria';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Success> {
    return this.http.get<Success>(this.urlBase );
    }

    public registrar(categoria: Categoria): Observable<Success> {
        return this.http.post<Success>(this.urlBase, categoria);
      }
}
