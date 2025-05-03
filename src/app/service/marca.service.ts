
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';  
import { Success } from '../models/success';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  
  private urlBase = 'http://localhost:8080/api/marca';  

  constructor(private http: HttpClient) {}

  // Método para obtener las marcas
  listarMarcas(): Observable<Success> {
    return this.http.get<Success>(this.urlBase );  
  }

  public registrar(marca: Marca): Observable<Success> {
          return this.http.post<Success>(this.urlBase + "/crear", marca);
        }
}
