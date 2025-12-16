import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-resident-approval',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './resident-approval.component.html',
  styleUrl: './resident-approval.component.css'
})
export class ResidentApprovalComponent {
  displayedColumns = ['name', 'phone', 'purpose', 'flatNumber', 'status', 'actions'];

  visitors = [
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', flatNumber: 'A-101', purpose: 'Guest', status: 'pending' },
    { id: 2, name: 'Meera Patel', phone: '9876543211', flatNumber: 'B-205', purpose: 'Delivery', status: 'pending' },
    { id: 3, name: 'Suresh Reddy', phone: '9876543212', flatNumber: 'C-302', purpose: 'Maintenance', status: 'approved' },
    { id: 4, name: 'Anita Sharma', phone: '9876543213', flatNumber: 'A-404', purpose: 'Service', status: 'rejected' }
  ];

  approveVisitor(visitor: any) {
    visitor.status = 'approved';
  }

  rejectVisitor(visitor: any) {
    visitor.status = 'rejected';
  }
}
