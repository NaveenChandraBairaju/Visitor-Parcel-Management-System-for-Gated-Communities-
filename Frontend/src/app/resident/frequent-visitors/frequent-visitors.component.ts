import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-frequent-visitors',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './frequent-visitors.component.html',
  styleUrl: './frequent-visitors.component.css'
})
export class FrequentVisitorsComponent {
  displayedColumns = ['name', 'phone', 'relation', 'visits', 'lastVisit', 'actions'];
  searchQuery = '';

  frequentVisitors = [
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', relation: 'Friend', visits: 15, lastVisit: '17 Dec 2025' },
    { id: 2, name: 'Meera Patel', phone: '9876543211', relation: 'Family', visits: 28, lastVisit: '16 Dec 2025' },
    { id: 3, name: 'Suresh - Maid', phone: '9876543212', relation: 'Domestic Help', visits: 45, lastVisit: '18 Dec 2025' },
    { id: 4, name: 'Ravi - Driver', phone: '9876543213', relation: 'Driver', visits: 60, lastVisit: '18 Dec 2025' },
    { id: 5, name: 'Amazon Delivery', phone: '1800123456', relation: 'Delivery', visits: 12, lastVisit: '15 Dec 2025' }
  ];

  get filteredVisitors() {
    if (!this.searchQuery) return this.frequentVisitors;
    return this.frequentVisitors.filter(v => 
      v.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      v.relation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  removeVisitor(visitor: any) {
    const index = this.frequentVisitors.indexOf(visitor);
    if (index > -1) this.frequentVisitors.splice(index, 1);
  }
}
