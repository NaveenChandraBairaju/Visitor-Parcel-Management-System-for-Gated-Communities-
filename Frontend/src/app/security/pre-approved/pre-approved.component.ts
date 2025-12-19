import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreApproveService, PreApprovedVisitor } from '../../services/pre-approve.service';
import { VisitorService } from '../../services/visitor.service';
import { ParcelService } from '../../services/parcel.service';

@Component({
  selector: 'app-pre-approved',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './pre-approved.component.html',
  styleUrl: './pre-approved.component.css'
})
export class PreApprovedComponent {
  displayedColumns = ['name', 'phone', 'flatNumber', 'purpose', 'expectedDate', 'actions'];
  preApprovedList: PreApprovedVisitor[] = [];

  constructor(
    private preApproveService: PreApproveService,
    private visitorService: VisitorService,
    private parcelService: ParcelService
  ) {
    this.preApproveService.preApprovedList$.subscribe(list => {
      this.preApprovedList = list.filter(v => v.status === 'Active' || v.status === 'Pending');
    });
  }

  get todayCount() {
    return this.preApprovedList.filter(v => v.expectedDate === 'Today').length;
  }

  allowEntry(visitor: PreApprovedVisitor) {
    // Check if it's a delivery - route to parcel service
    if (visitor.purpose === 'Delivery') {
      // Add to parcel log
      this.parcelService.addParcel({
        courier: visitor.name,
        name: 'Pre-approved Delivery',
        flatNumber: visitor.flatNumber,
        recipientName: visitor.residentName,
        deliveryPersonName: visitor.name,
        deliveryPersonPhone: visitor.phone
      });
    } else {
      // Add to visitor log (Guest, Family, Maintenance, Service)
      const newVisitor = this.visitorService.addVisitor({
        name: visitor.name,
        phone: visitor.phone,
        purpose: visitor.purpose,
        flatNumber: visitor.flatNumber,
        vehicleNumber: visitor.vehicleNumber
      });
      // Mark as entered directly since pre-approved
      this.visitorService.markEntered(newVisitor.id);
    }
    
    // Mark pre-approval as used
    this.preApproveService.markAsEntered(visitor.id);
  }
}
