import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-resident-parcel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './resident-parcel.component.html',
  styleUrl: './resident-parcel.component.css'
})
export class ResidentParcelComponent {
  displayedColumns = ['name', 'receivedDate', 'status', 'actions'];

  parcels = [
    { name: 'Amazon Package', receivedDate: '16 Dec 2025', status: 'Received' },
    { name: 'Flipkart Order', receivedDate: '15 Dec 2025', status: 'Collected' },
    { name: 'Myntra Delivery', receivedDate: '16 Dec 2025', status: 'Received' },
    { name: 'Swiggy Instamart', receivedDate: '14 Dec 2025', status: 'Acknowledged' }
  ];

  acknowledgeParcel(parcel: any) {
    parcel.status = 'Acknowledged';
  }
}
