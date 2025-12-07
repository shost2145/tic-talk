import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../data_acess/src/lib/data_acess";


export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
