import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../../models/success/success';
import { Persona } from '../../models/persona/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlBase = 'http://localhost:8080/api/persona';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }
  public add(persona: Persona): Observable<Success> {
    return this.http.post<Success>(this.urlBase, persona);
  }
}
