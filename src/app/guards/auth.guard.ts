import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const authStatus = inject(ApiService)
  const toaster=inject(ToastrService)
  const router = inject(Router)

  if(authStatus.isLoggedIn()){
    return true;
  }else{
    toaster.warning("Operation denied !! please Login")
    router.navigateByUrl("/")
    return false;
  }
};
