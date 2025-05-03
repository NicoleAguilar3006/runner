import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../models/success';
import { ModeloRegistrar } from '../models/modelo-registrar';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private urlBase = 'http://localhost:8080/api/modelo';

  constructor(private http: HttpClient) {}

  listarModelos(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
    }

   public registrar(modelo: ModeloRegistrar): Observable<Success> {
       return this.http.post<Success>(this.urlBase, modelo);
     }

     public buscar(id: string): Observable<Success> {
      return this.http.get<Success>(this.urlBase + `/${id}`);
    }
  
    
    public actualizarModelo(id: number, modelo: ModeloRegistrar): Observable<Success> {
        return this.http.put<Success>(this.urlBase + `/${id}`, modelo);
      }
    
    public eliminar(id: string): Observable<Success> {
      return this.http.delete<Success>(this.urlBase + `/${id}`);
    } 

    public listarPorIdMarca(idMrc: number): Observable<Success> {
      return this.http.get<Success>(`${this.urlBase}/marca/${idMrc}`);
    }
}
