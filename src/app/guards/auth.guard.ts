import { Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const _router = Inject(Router);
  const inLoggedIn = localStorage.getItem('Token')
  console.log(inLoggedIn);
  
  if (inLoggedIn != null) {
    return true;
  } else {
    _router.navigate("");
    return false;
  }

};
