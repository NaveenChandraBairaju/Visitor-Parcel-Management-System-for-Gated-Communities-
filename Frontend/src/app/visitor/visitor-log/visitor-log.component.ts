import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
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
    MatTableModule
  ],
  templateUrl: './visitor-log.component.html',
  styleUrl: './visitor-log.component.css'
})
export class VisitorLogComponent {
  visitor = {
    name: '',
    phone: '',
    purpose: '',
    flatNumber: '',
    vehicleNumber: ''
  };

  displayedColumns = ['name', 'phone', 'purpose', 'flatNumber', 'checkIn'];

  recentVisitors = [
    { name: 'Rajesh Kumar', phone: '9876543210', purpose: 'Guest', flatNumber: 'A-101', checkIn: '10:30 AM' },
    { name: 'Meera Patel', phone: '9876543211', purpose: 'Delivery', flatNumber: 'B-205', checkIn: '11:15 AM' },
    { name: 'Suresh Reddy', phone: '9876543212', purpose: 'Maintenance', flatNumber: 'C-302', checkIn: '12:00 PM' }
  ];

  submitVisitor() {
    console.log('Visitor submitted:', this.visitor);
  }

  clearForm() {
    this.visitor = { name: '', phone: '', purpose: '', flatNumber: '', vehicleNumber: '' };
  }
}
