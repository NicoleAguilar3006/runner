import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Success } from '../../models/success/success';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private urlBase = 'http://localhost:8080/api/distrito';

  constructor(
    private http: HttpClient
  ) { }

  public listDistrito(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

}
