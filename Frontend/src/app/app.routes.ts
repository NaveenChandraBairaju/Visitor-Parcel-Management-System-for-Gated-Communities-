import { Routes } from '@angular/router';

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
  // Resident Portal
  {
    path: 'resident',
    loadComponent: () => import('./layout/resident-layout/resident-layout.component').then(m => m.ResidentLayoutComponent),
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
        path: 'history',
        loadComponent: () => import('./visitor/visitor-approval/resident-approval.component').then(m => m.ResidentApprovalComponent)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  // Security Guard Portal
  {
    path: 'security',
    loadComponent: () => import('./layout/security-layout/security-layout.component').then(m => m.SecurityLayoutComponent),
    children: [
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
        loadComponent: () => import('./visitor/visitor-approval/resident-approval.component').then(m => m.ResidentApprovalComponent)
      },
      {
        path: 'all-parcels',
        loadComponent: () => import('./parcel/parcel-tracking/resident-parcel.component').then(m => m.ResidentParcelComponent)
      },
      { path: '', redirectTo: 'visitor-log', pathMatch: 'full' }
    ]
  },
  // Admin Portal
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'visitors',
        loadComponent: () => import('./visitor/visitor-approval/resident-approval.component').then(m => m.ResidentApprovalComponent)
      },
      {
        path: 'parcels',
        loadComponent: () => import('./parcel/parcel-tracking/resident-parcel.component').then(m => m.ResidentParcelComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // Fallback
  { path: '**', redirectTo: '' }
];
