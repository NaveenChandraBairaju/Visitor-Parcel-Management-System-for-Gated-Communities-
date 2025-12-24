import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Home Page
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  // Auth Pages
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./auth/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  // Resident Portal
  {
    path: 'resident',
    loadComponent: () => import('./layout/resident-layout/resident-layout.component').then(m => m.ResidentLayoutComponent),
    canActivate: [authGuard, roleGuard(['resident'])],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./resident/resident-home/resident-home.component').then(m => m.ResidentHomeComponent)
      },
      {
        path: 'visitor-approval',
        loadComponent: () => import('./visitor/visitor-approval/resident-approval.component').then(m => m.ResidentApprovalComponent)
      },
      {
        path: 'parcel-tracking',
        loadComponent: () => import('./parcel/parcel-tracking/resident-parcel.component').then(m => m.ResidentParcelComponent)
      },
      {
        path: 'pre-approve',
        loadComponent: () => import('./resident/pre-approve/pre-approve.component').then(m => m.PreApproveComponent)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  // Security Guard Portal
  {
    path: 'security',
    loadComponent: () => import('./layout/security-layout/security-layout.component').then(m => m.SecurityLayoutComponent),
    canActivate: [authGuard, roleGuard(['security'])],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./security/security-home/security-home.component').then(m => m.SecurityHomeComponent)
      },
      {
        path: 'visitor-log',
        loadComponent: () => import('./visitor/visitor-log/visitor-log.component').then(m => m.VisitorLogComponent)
      },
      {
        path: 'parcel-log',
        loadComponent: () => import('./parcel/parcel-log/parcel-log.component').then(m => m.ParcelLogComponent)
      },
      {
        path: 'all-visitors',
        loadComponent: () => import('./security/all-visitors/all-visitors.component').then(m => m.AllVisitorsComponent)
      },
      {
        path: 'all-parcels',
        loadComponent: () => import('./security/all-parcels/all-parcels.component').then(m => m.AllParcelsComponent)
      },
      {
        path: 'pre-approved',
        loadComponent: () => import('./security/pre-approved/pre-approved.component').then(m => m.PreApprovedComponent)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  // Admin Portal
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard, roleGuard(['admin'])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'visitors',
        loadComponent: () => import('./security/all-visitors/all-visitors.component').then(m => m.AllVisitorsComponent)
      },
      {
        path: 'parcels',
        loadComponent: () => import('./security/all-parcels/all-parcels.component').then(m => m.AllParcelsComponent)
      },
      {
        path: 'pre-approved',
        loadComponent: () => import('./security/pre-approved/pre-approved.component').then(m => m.PreApprovedComponent)
      },
      {
        path: 'announcements',
        loadComponent: () => import('./admin/announcements/announcements.component').then(m => m.AnnouncementsComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // Fallback
  { path: '**', redirectTo: '' }
];
