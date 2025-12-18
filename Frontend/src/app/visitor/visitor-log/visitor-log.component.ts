import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-visitor-log',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, MatSelectModule, MatTableModule, MatIconModule
  ],
  templateUrl: './visitor-log.component.html',
  styleUrl: './visitor-log.component.css'
})
export class VisitorLogComponent {
  visitor = { name: '', phone: '', purpose: '', flatNumber: '', vehicleNumber: '' };
  displayedColumns = ['name', 'phone', 'purpose', 'flatNumber', 'checkIn'];
  recentVisitors: Visitor[] = [];

  constructor(private visitorService: VisitorService) {
    this.visitorService.visitors$.subscribe(list => {
      this.recentVisitors = list.slice(0, 10);
    });
  }

  submitVisitor() {
    if (this.visitor.name && this.visitor.phone && this.visitor.flatNumber) {
      this.visitorService.addVisitor(this.visitor);
      this.clearForm();
    }
  }

  clearForm() {
    this.visitor = { name: '', phone: '', purpose: '', flatNumber: '', vehicleNumber: '' };
  }
}
