import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../../models/success/success';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private urlBase = 'http://localhost:8080/api/material';

  constructor(private http: HttpClient) { }

  findAllMateriales(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }
}
