import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return false;
  }else{
    return true;
  }
};
