import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material';  
import { Success } from '../models/success';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private urlBase = 'http://localhost:8080/api/material';  

  constructor(private http: HttpClient) {}

  listarMateriales(): Observable<Success> {
    return this.http.get<Success>(this.urlBase );  
  }
}
