import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  if (typeof window === 'undefined') { // colocar esto cada vez que use un local store
    return false;
  }

  const router = inject(Router);
  const userJson = localStorage.getItem('user');

  if (!userJson) {
    router.navigate(['/sign-in']);
    return false;
  }

  const user = JSON.parse(userJson);

  const expectedRole = route.data?.['expectedRole'];

  if (user.rol === expectedRole) {
    return true;
  }

  router.navigate(['/']); 
  return false;
};
