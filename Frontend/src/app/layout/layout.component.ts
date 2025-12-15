import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <h3 mat-subheader>Visitor Management</h3>
          <a mat-list-item routerLink="/visitor/log" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Visitor Log</span>
          </a>
          <a mat-list-item routerLink="/visitor/approval" routerLinkActive="active">
            <mat-icon>check_circle</mat-icon>
            <span>Visitor Approval</span>
          </a>

          <mat-divider></mat-divider>

          <h3 mat-subheader>Parcel Management</h3>
          <a mat-list-item routerLink="/parcel/log" routerLinkActive="active">
            <mat-icon>inventory_2</mat-icon>
            <span>Parcel Log</span>
          </a>
          <a mat-list-item routerLink="/parcel/tracking" routerLinkActive="active">
            <mat-icon>local_shipping</mat-icon>
            <span>Parcel Tracking</span>
          </a>

          <mat-divider></mat-divider>

          <h3 mat-subheader>Administration</h3>
          <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Visitor & Parcel Management System</span>
          <span class="spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .sidenav mat-nav-list {
      padding-top: 0;
    }

    .sidenav h3 {
      padding: 16px;
      margin: 0;
      font-size: 14px;
      font-weight: 500;
    }

    .sidenav a {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
    }

    .sidenav a.active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .content {
      padding: 20px;
    }
  `]
})
export class LayoutComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}