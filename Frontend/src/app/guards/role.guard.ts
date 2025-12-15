import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Get required roles from route data
  const requiredRoles = route.data['roles'] as string[];
  
  // Get user role from localStorage (basic implementation)
  const userRole = localStorage.getItem('userRole');
  
  if (!userRole || !requiredRoles.includes(userRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};
