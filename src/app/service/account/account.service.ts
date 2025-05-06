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
  ) { }

  public signin(signin: Signin): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/sign-in", signin);
  }

  public signup(signup: Signup): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/register", signup);
  }

  public saveUserData(token: string) {

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);

      const decoded = this.decodeJWT(token);
      if (decoded) {
        localStorage.setItem('user', JSON.stringify({
          nombre: decoded.name,
          correo: decoded.sub,
          rol: decoded.role,
        }));
      }
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
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user')!)
    }
  }

  public getUserRol(): string | null {
    const user = this.getUserData();
    return user?.rol ?? null;
  }
  
  public isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  public logout() {
    if (typeof window !== 'undefined') {
      console.log(localStorage.getItem('token'))
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    console.log(user)
    if (user) {
      const userData = JSON.parse(user);
      return userData.rol;
    }
    return null;
  }
  
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

}
