import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParcelService, Parcel } from '../../services/parcel.service';

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

  // Simulated resident flat
  residentFlat = 'A-101';

  constructor(private parcelService: ParcelService) {
    this.parcelService.parcels$.subscribe(list => {
      this.parcels = list.filter(p => p.flatNumber === this.residentFlat);
    });
  }

  get receivedCount() { return this.parcels.filter(p => p.status === 'Received').length; }
  get acknowledgedCount() { return this.parcels.filter(p => p.status === 'Acknowledged').length; }
  get collectedCount() { return this.parcels.filter(p => p.status === 'Collected').length; }

  acknowledgeParcel(parcel: Parcel) {
    this.parcelService.acknowledgeParcel(parcel.id);
  }

  collectParcel(parcel: Parcel) {
    this.parcelService.collectParcel(parcel.id);
  }
}
