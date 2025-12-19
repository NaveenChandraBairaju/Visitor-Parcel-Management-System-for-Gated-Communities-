import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParcelService, Parcel } from '../../services/parcel.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resident-parcel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './resident-parcel.component.html',
  styleUrl: './resident-parcel.component.css'
})
export class ResidentParcelComponent {
  displayedColumns = ['courier', 'name', 'receivedDate', 'status', 'actions'];
  parcels: Parcel[] = [];
  residentFlat: string;

  constructor(private parcelService: ParcelService, private authService: AuthService) {
    // Get logged-in user's flat
    this.residentFlat = this.authService.getUserFlat();
    
    this.parcelService.parcels$.subscribe(list => {
      this.parcels = list.filter(p => p.flatNumber === this.residentFlat);
    });
  }

  get pendingCount() { return this.parcels.filter(p => p.status === 'Pending').length; }
  get approvedCount() { return this.parcels.filter(p => p.status === 'Approved' || p.status === 'Acknowledged').length; }
  get collectedCount() { return this.parcels.filter(p => p.status === 'Collected').length; }
  get rejectedCount() { return this.parcels.filter(p => p.status === 'Rejected').length; }

  approveParcel(parcel: Parcel) {
    this.parcelService.approveParcel(parcel.id);
  }

  rejectParcel(parcel: Parcel) {
    this.parcelService.rejectParcel(parcel.id);
  }

  collectParcel(parcel: Parcel) {
    this.parcelService.collectParcel(parcel.id);
  }
}
