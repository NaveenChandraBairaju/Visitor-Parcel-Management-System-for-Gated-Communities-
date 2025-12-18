import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-security-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './security-home.component.html',
  styleUrl: './security-home.component.css'
})
export class SecurityHomeComponent {
  userName = 'Security Guard';
  todayVisitors = 12;
  todayParcels = 8;
  pendingEntry = 3;
}
