import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-visitor-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="approval-container">
      <h2>Visitor Approval</h2>
      
      <div class="stats-row">
        <mat-card class="stat-card pending">
          <mat-card-content>
            <mat-icon>hourglass_empty</mat-icon>
            <div class="stat-info">
              <span class="stat-number">{{getPendingCount()}}</span>
              <span class="stat-label">Pending</span>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card approved">
          <mat-card-content>
            <mat-icon>check_circle</mat-icon>
            <div class="stat-info">
              <span class="stat-number">{{getApprovedCount()}}</span>
              <span class="stat-label">Approved</span>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card rejected">
          <mat-card-content>
            <mat-icon>cancel</mat-icon>
            <div class="stat-info">
              <span class="stat-number">{{getRejectedCount()}}</span>
              <span class="stat-label">Rejected</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <h3>Pending Approvals</h3>
      <div class="visitor-cards">
        @for (visitor of visitors; track visitor.id) {
          <mat-card class="visitor-card">
            <mat-card-header>
              <mat-icon mat-card-avatar class="avatar-icon">person</mat-icon>
              <mat-card-title>{{visitor.name}}</mat-card-title>
              <mat-card-subtitle>{{visitor.phone}}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="visitor-details">
                <div class="detail-row">
                  <mat-icon>home</mat-icon>
                  <span><b>Visiting:</b> {{visitor.flatNumber}}</span>
                </div>
                <div class="detail-row">
                  <mat-icon>info</mat-icon>
                  <span><b>Purpose:</b> {{visitor.purpose}}</span>
                </div>
                <div class="detail-row">
                  <mat-icon>directions_car</mat-icon>
                  <span><b>Vehicle:</b> {{visitor.vehicleNumber || 'No Vehicle'}}</span>
                </div>
                <div class="detail-row">
                  <mat-icon>access_time</mat-icon>
                  <span><b>Requested:</b> {{visitor.requestTime}}</span>
                </div>
              </div>
              <mat-divider></mat-divider>
              <div class="status-section">
                <span class="status-label">Status:</span>
                <mat-chip-set>
                  <mat-chip [class]="'status-' + visitor.status">
                    {{visitor.status | uppercase}}
                  </mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-content>
            <mat-card-actions align="end">
              @if (visitor.status === 'pending') {
                <button mat-button color="warn" (click)="rejectVisitor(visitor)">
                  <mat-icon>close</mat-icon>
                  Reject
                </button>
                <button mat-raised-button color="primary" (click)="approveVisitor(visitor)">
                  <mat-icon>check</mat-icon>
                  Approve
                </button>
              } @else {
                <span class="status-text" [class]="visitor.status">
                  {{visitor.status === 'approved' ? 'Entry Approved' : 'Entry Rejected'}}
                </span>
              }
            </mat-card-actions>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .approval-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-row {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      flex: 1;
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }

    .stat-card mat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
    }

    .stat-card.pending mat-icon { color: #ff9800; }
    .stat-card.approved mat-icon { color: #4caf50; }
    .stat-card.rejected mat-icon { color: #f44336; }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 28px;
      font-weight: bold;
    }

    .stat-label {
      color: #666;
    }

    .visitor-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 16px;
    }

    .visitor-card {
      margin-bottom: 0;
    }

    .avatar-icon {
      background-color: #3f51b5;
      color: white;
      padding: 8px;
      border-radius: 50%;
      font-size: 24px;
      width: 40px;
      height: 40px;
    }

    .visitor-details {
      margin: 16px 0;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .detail-row b {
      font-size: 20px;
    }

    .detail-row mat-icon {
      color: #666;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .status-section {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }

    .status-label {
      font-weight: 500;
    }

    .status-pending { background-color: #fff3e0 !important; color: #e65100 !important; }
    .status-approved { background-color: #e8f5e9 !important; color: #2e7d32 !important; }
    .status-rejected { background-color: #ffebee !important; color: #c62828 !important; }

    .status-text {
      font-weight: 500;
      padding: 8px 16px;
    }

    .status-text.approved { color: #4caf50; }
    .status-text.rejected { color: #f44336; }

    mat-card-actions button {
      margin-left: 8px;
    }
  `]
})
export class VisitorApprovalComponent {
  
  visitors = [
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', flatNumber: 'A-101', purpose: 'Guest', vehicleNumber: 'KA-01-AB-1234', requestTime: '10:30 AM', status: 'pending' },
    { id: 2, name: 'Meera Patel', phone: '9876543211', flatNumber: 'B-205', purpose: 'Delivery', vehicleNumber: 'KA-02-CD-5678', requestTime: '11:00 AM', status: 'pending' },
    { id: 3, name: 'Suresh Reddy', phone: '9876543212', flatNumber: 'C-302', purpose: 'Maintenance', vehicleNumber: '', requestTime: '11:30 AM', status: 'pending' },
    { id: 4, name: 'Anita Sharma', phone: '9876543213', flatNumber: 'A-404', purpose: 'Service', vehicleNumber: 'KA-03-EF-9012', requestTime: '12:00 PM', status: 'rejected' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', flatNumber: 'D-501', purpose: 'Guest', vehicleNumber: 'KA-04-GH-3456', requestTime: '12:30 PM', status: 'pending' }
  ];

  getPendingCount(): number {
    return this.visitors.filter(v => v.status === 'pending').length;
  }

  getApprovedCount(): number {
    return this.visitors.filter(v => v.status === 'approved').length;
  }

  getRejectedCount(): number {
    return this.visitors.filter(v => v.status === 'rejected').length;
  }

  approveVisitor(visitor: any) {
    visitor.status = 'approved';
    console.log('Approved:', visitor.name);
    // No backend - just update local state
  }

  rejectVisitor(visitor: any) {
    visitor.status = 'rejected';
    console.log('Rejected:', visitor.name);
    // No backend - just update local state
  }
}
