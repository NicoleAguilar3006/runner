import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  if (typeof window === 'undefined') { // colocar esto cada vez que use un local store
    console.log("Hola me usaste")
    return false;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return false;
  }else{
    return true;
  }

};
