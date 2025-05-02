import { Injectable } from '@angular/core';
import { Success } from '../../models/success/success';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Signin } from '../../models/account/signin/signin';
import { Signup } from '../../models/account/signup/signup';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private urlBase = 'http://localhost:8080/api/acount';

  constructor(
    private http: HttpClient
  ) {}

  public signin(signin : Signin): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/sign-in", signin);
  }

  public signup(signup : Signup): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/register", signup);
  }

  public saveUserData(token: string) {
    // Guardamos el token en localStorage
    localStorage.setItem('token', token);

    // Decodificamos el JWT
    const decoded = this.decodeJWT(token);
     if (decoded) {
       localStorage.setItem('user', JSON.stringify({
         nombre: decoded.name,
         correo: decoded.sub,
         rol: decoded.role,
       }));
     }
  }

  private decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  public getUserData() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
    
}
