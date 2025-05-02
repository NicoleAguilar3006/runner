import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('user');

  if (!userJson) {
    router.navigate(['/sign-in']); // Redirigir a login
    //window.alert('Debe iniciar sesión');
    return false;
  }

  const user = JSON.parse(userJson);

  // Aquí decides qué rol se necesita para la ruta
  const expectedRole = route.data?.['expectedRole'];

  // if (Array.isArray(expectedRole) && expectedRole.includes(user.rol))
  if (user.rol === expectedRole) {
    return true;
  }

  //window.alert('Acceso denegado');
  router.navigate(['/']); 
  return false;
};
