import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-visitor-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './visitor-checkout.component.html',
  styleUrl: './visitor-checkout.component.css'
})
export class VisitorCheckoutComponent {
  displayedColumns = ['name', 'phone', 'flatNumber', 'checkIn', 'status', 'actions'];
  searchQuery = '';
  activeVisitors: Visitor[] = [];

  constructor(private visitorService: VisitorService) {
    this.visitorService.visitors$.subscribe(list => {
      this.activeVisitors = list.filter(v => v.status === 'inside');
    });
  }

  get filteredVisitors() {
    if (!this.searchQuery) return this.activeVisitors;
    return this.activeVisitors.filter(v => 
      v.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      v.flatNumber.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get insideCount() { return this.activeVisitors.length; }

  checkoutVisitor(visitor: Visitor) {
    this.visitorService.checkOutVisitor(visitor.id);
  }
}
