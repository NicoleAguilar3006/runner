import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';  
import { Success } from '../models/success';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlBase = 'http://localhost:8080/api/persona';  

  constructor(private http: HttpClient) {}

  listarPersonas(): Observable<Success> {
    return this.http.get<Success>(this.urlBase );  
  }
}
