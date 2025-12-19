import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService, Visitor } from '../../services/visitor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resident-approval',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './resident-approval.component.html',
  styleUrl: './resident-approval.component.css'
})
export class ResidentApprovalComponent {
  displayedColumns = ['name', 'phone', 'purpose', 'checkIn', 'status', 'actions'];
  visitors: Visitor[] = [];
  residentFlat: string;

  constructor(private visitorService: VisitorService, private authService: AuthService) {
    // Get logged-in user's flat
    this.residentFlat = this.authService.getUserFlat();
    
    this.visitorService.visitors$.subscribe(list => {
      // Filter for this resident's flat
      this.visitors = list.filter(v => v.flatNumber === this.residentFlat);
    });
  }

  get waitingCount() { return this.visitors.filter(v => v.status === 'waiting').length; }
  get approvedCount() { return this.visitors.filter(v => v.status === 'approved' || v.status === 'entered').length; }
  get rejectedCount() { return this.visitors.filter(v => v.status === 'rejected').length; }

  approveVisitor(visitor: Visitor) {
    this.visitorService.approveVisitor(visitor.id);
  }

  rejectVisitor(visitor: Visitor) {
    this.visitorService.rejectVisitor(visitor.id);
  }
}
