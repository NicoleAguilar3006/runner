import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private url: string = "http://localhost:8090/api/material";

  constructor(private http: HttpClient) {}

  listarMateriales(): Observable<any> {
    return this.http.get<any>(`${this.url}/listar`);
  }
}

