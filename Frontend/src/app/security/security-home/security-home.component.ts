import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService } from '../../services/visitor.service';
import { ParcelService } from '../../services/parcel.service';
import { PreApproveService } from '../../services/pre-approve.service';

@Component({
  selector: 'app-security-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './security-home.component.html',
  styleUrl: './security-home.component.css'
})
export class SecurityHomeComponent {
  userName = 'Security Guard';
  todayVisitors = 0;
  todayParcels = 0;
  pendingEntry = 0;

  constructor(
    private visitorService: VisitorService,
    private parcelService: ParcelService,
    private preApproveService: PreApproveService
  ) {
    this.visitorService.visitors$.subscribe(() => {
      this.todayVisitors = this.visitorService.getTodayCount();
      this.pendingEntry = this.visitorService.getPendingCount();
    });

    this.parcelService.parcels$.subscribe(() => {
      this.todayParcels = this.parcelService.getTodayCount();
    });
  }
}
