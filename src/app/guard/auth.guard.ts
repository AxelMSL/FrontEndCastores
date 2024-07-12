import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const localData = localStorage.getItem("authLoginId")
  if (localData != null && localData != '') {
    return true
  } else {
    router.navigateByUrl('login')
    return false    
  }
};
