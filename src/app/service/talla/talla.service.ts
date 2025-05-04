import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../../models/success/success';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  private urlBase = 'http://localhost:8080/api/talla';
  constructor(private http: HttpClient) { }

  findAllTallas(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }
}
