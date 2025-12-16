import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  totalVisitors = 156;
  totalParcels = 89;
  pendingApprovals = 12;
}
