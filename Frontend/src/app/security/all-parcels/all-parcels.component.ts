import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ParcelService, Parcel } from '../../services/parcel.service';

@Component({
  selector: 'app-all-parcels',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, 
    MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './all-parcels.component.html',
  styleUrl: './all-parcels.component.css'
})
export class AllParcelsComponent {
  displayedColumns = ['courier', 'name', 'flatNumber', 'recipientName', 'receivedDate', 'status', 'deliveryPerson'];
  parcels: Parcel[] = [];
  searchQuery = '';
  statusFilter = 'all';

  constructor(private parcelService: ParcelService) {
    this.parcelService.parcels$.subscribe(list => {
      this.parcels = list;
    });
  }

  get filteredParcels() {
    let result = this.parcels;
    
    // Filter by status
    if (this.statusFilter !== 'all') {
      result = result.filter(p => p.status === this.statusFilter);
    }
    
    // Filter by search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.flatNumber.toLowerCase().includes(query) ||
        p.courier.toLowerCase().includes(query) ||
        p.recipientName.toLowerCase().includes(query)
      );
    }
    
    return result;
  }

  get pendingCount() { return this.parcels.filter(p => p.status === 'Pending').length; }
  get approvedCount() { return this.parcels.filter(p => p.status === 'Approved').length; }
  get collectedCount() { return this.parcels.filter(p => p.status === 'Collected').length; }
  get rejectedCount() { return this.parcels.filter(p => p.status === 'Rejected').length; }
  get totalCount() { return this.parcels.length; }

  getStatusClass(status: string): string {
    return 'status-' + status.toLowerCase();
  }

  markDeliveryLeft(parcel: Parcel) {
    this.parcelService.markDeliveryPersonLeft(parcel.id);
  }
}
