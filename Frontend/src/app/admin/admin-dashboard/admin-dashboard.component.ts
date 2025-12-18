import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService } from '../../services/visitor.service';
import { ParcelService } from '../../services/parcel.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  adminName = 'Admin';
  totalResidents = 248;
  totalVisitors = 0;
  totalParcels = 0;
  activeGuards = 8;
  pendingApprovals = 0;
  todayVisitors = 0;

  constructor(
    private visitorService: VisitorService,
    private parcelService: ParcelService
  ) {
    this.visitorService.visitors$.subscribe(list => {
      this.totalVisitors = list.length;
      this.pendingApprovals = list.filter(v => v.status === 'pending').length;
      this.todayVisitors = list.filter(v => v.date === 'Today').length;
    });

    this.parcelService.parcels$.subscribe(list => {
      this.totalParcels = list.length;
    });
  }
}
