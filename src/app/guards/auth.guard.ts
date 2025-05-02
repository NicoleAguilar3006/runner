import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Redirige al usuario a la página principal (o cualquier otra ruta que quieras)
    router.navigate(['/']); 
    return true;
  }

  router.navigate(['/sign-in']); // redirige si no está logeado
  return false;
};
