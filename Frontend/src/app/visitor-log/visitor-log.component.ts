import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-visitor-log',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule
  ],
  template: `
    <div class="visitor-log-container">
      <h2>Visitor Log</h2>
      
      <mat-card class="form-card">
        <mat-card-header>
          <mat-card-title>Register New Visitor</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Visitor Name</mat-label>
              <input matInput [(ngModel)]="visitor.name" placeholder="Enter visitor name">
              <mat-icon matSuffix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone Number</mat-label>
              <input matInput [(ngModel)]="visitor.phone" placeholder="Enter phone number">
              <mat-icon matSuffix>phone</mat-icon>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Purpose of Visit</mat-label>
              <mat-select [(ngModel)]="visitor.purpose">
                <mat-option value="delivery">Delivery</mat-option>
                <mat-option value="guest">Guest</mat-option>
                <mat-option value="maintenance">Maintenance</mat-option>
                <mat-option value="service">Service</mat-option>
                <mat-option value="other">Other</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Visiting Flat/Unit</mat-label>
              <input matInput [(ngModel)]="visitor.flatNumber" placeholder="e.g., A-101">
              <mat-icon matSuffix>home</mat-icon>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Vehicle Type</mat-label>
              <mat-select [(ngModel)]="visitor.vehicleType">
                <mat-option value="none">No Vehicle</mat-option>
                <mat-option value="car">Car</mat-option>
                <mat-option value="bike">Bike</mat-option>
                <mat-option value="auto">Auto</mat-option>
                <mat-option value="other">Other</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Vehicle Number</mat-label>
              <input matInput [(ngModel)]="visitor.vehicleNumber" placeholder="e.g., KA-01-AB-1234">
              <mat-icon matSuffix>directions_car</mat-icon>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Additional Notes</mat-label>
            <textarea matInput [(ngModel)]="visitor.notes" rows="3" placeholder="Any additional information"></textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button (click)="clearForm()">Clear</button>
          <button mat-raised-button color="primary" (click)="submitVisitor()">
            <mat-icon>person_add</mat-icon>
            Submit
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Recent Visitors</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="recentVisitors" class="visitor-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let v">{{v.name}}</td>
            </ng-container>
            <ng-container matColumnDef="phone">
              <th mat-header-cell *matHeaderCellDef>Phone</th>
              <td mat-cell *matCellDef="let v">{{v.phone}}</td>
            </ng-container>
            <ng-container matColumnDef="purpose">
              <th mat-header-cell *matHeaderCellDef>Purpose</th>
              <td mat-cell *matCellDef="let v">{{v.purpose}}</td>
            </ng-container>
            <ng-container matColumnDef="flatNumber">
              <th mat-header-cell *matHeaderCellDef>Flat</th>
              <td mat-cell *matCellDef="let v">{{v.flatNumber}}</td>
            </ng-container>
            <ng-container matColumnDef="vehicleNumber">
              <th mat-header-cell *matHeaderCellDef>Vehicle</th>
              <td mat-cell *matCellDef="let v">{{v.vehicleNumber || 'N/A'}}</td>
            </ng-container>
            <ng-container matColumnDef="checkIn">
              <th mat-header-cell *matHeaderCellDef>Check In</th>
              <td mat-cell *matCellDef="let v">{{v.checkIn}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .visitor-log-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .form-card, .table-card {
      margin-bottom: 20px;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
    }

    .form-row mat-form-field {
      flex: 1;
    }

    .full-width {
      width: 100%;
    }

    .visitor-table {
      width: 100%;
    }

    mat-card-actions button {
      margin-left: 8px;
    }
  `]
})
export class VisitorLogComponent {
  visitor = {
    name: '',
    phone: '',
    purpose: '',
    flatNumber: '',
    vehicleType: 'none',
    vehicleNumber: '',
    notes: ''
  };

  displayedColumns = ['name', 'phone', 'purpose', 'flatNumber', 'vehicleNumber', 'checkIn'];

  // Dummy data
  recentVisitors = [
    { name: 'NAVEEN', phone: '9876543210', purpose: 'Guest', flatNumber: 'A-101', vehicleNumber: 'KA-01-AB-1234', checkIn: '10:30 AM' },
    { name: 'CHANDRA', phone: '9876543211', purpose: 'Delivery', flatNumber: 'B-205', vehicleNumber: 'KA-02-CD-5678', checkIn: '11:15 AM' },
    { name: 'AJAY KUMAR', phone: '9876543212', purpose: 'Maintenance', flatNumber: 'C-302', vehicleNumber: '', checkIn: '12:00 PM' },
    { name: 'BHUVANESH', phone: '9876543213', purpose: 'Service', flatNumber: 'A-404', vehicleNumber: 'KA-03-EF-9012', checkIn: '02:45 PM' }
  ];

  submitVisitor() {
    console.log('Visitor submitted:', this.visitor);
    // No backend - just log to console
    alert('Visitor registered successfully! (No backend connected)');
    this.clearForm();
  }

  clearForm() {
    this.visitor = {
      name: '',
      phone: '',
      purpose: '',
      flatNumber: '',
      vehicleType: 'none',
      vehicleNumber: '',
      notes: ''
    };
  }
}
