import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-resident-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './resident-layout.component.html',
  styleUrl: './resident-layout.component.css'
})
export class ResidentLayoutComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
