import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  // Protected routes with layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'visitor/log',
        loadComponent: () => import('./visitor-log/visitor-log.component').then(m => m.VisitorLogComponent),
        canActivate: [roleGuard]
      },
      {
        path: 'visitor/approval',
        loadComponent: () => import('./visitor-approval/visitor-approval.component').then(m => m.VisitorApprovalComponent),
        canActivate: [roleGuard]
      },
      {
        path: 'parcel/log',
        loadComponent: () => import('./parcel-log/parcel-log.component').then(m => m.ParcelLogComponent),
        canActivate: [roleGuard]
      },
      {
        path: 'parcel/tracking',
        loadComponent: () => import('./parcel-tracking/parcel-tracking.component').then(m => m.ParcelTrackingComponent),
        canActivate: [roleGuard]
      },
      {
        path: 'admin/dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        canActivate: [roleGuard]
      },
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
