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
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-all-visitors',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, 
    MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './all-visitors.component.html',
  styleUrl: './all-visitors.component.css'
})
export class AllVisitorsComponent {
  displayedColumns = ['name', 'phone', 'purpose', 'flatNumber', 'checkIn', 'status', 'actions'];
  visitors: Visitor[] = [];
  searchQuery = '';
  statusFilter = 'all';

  constructor(private visitorService: VisitorService) {
    this.visitorService.visitors$.subscribe(list => {
      this.visitors = list;
    });
  }

  get filteredVisitors() {
    let result = this.visitors;
    
    // Filter by status
    if (this.statusFilter !== 'all') {
      result = result.filter(v => v.status === this.statusFilter);
    }
    
    // Filter by search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(query) ||
        v.flatNumber.toLowerCase().includes(query) ||
        v.phone.includes(query)
      );
    }
    
    return result;
  }

  get waitingCount() { return this.visitors.filter(v => v.status === 'waiting').length; }
  get approvedCount() { return this.visitors.filter(v => v.status === 'approved').length; }
  get enteredCount() { return this.visitors.filter(v => v.status === 'entered').length; }
  get exitedCount() { return this.visitors.filter(v => v.status === 'exited').length; }
  get rejectedCount() { return this.visitors.filter(v => v.status === 'rejected').length; }

  markEntered(visitor: Visitor) {
    this.visitorService.markEntered(visitor.id);
  }

  markExited(visitor: Visitor) {
    this.visitorService.markExited(visitor.id);
  }

  getStatusClass(status: string): string {
    return 'status-' + status;
  }
}
