import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreApproveService, PreApprovedVisitor } from '../../services/pre-approve.service';

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

  constructor(private preApproveService: PreApproveService) {
    this.preApproveService.preApprovedList$.subscribe(list => {
      // Show only active/pending pre-approvals
      this.preApprovedList = list.filter(v => v.status === 'Active' || v.status === 'Pending');
    });
  }

  get todayCount() {
    return this.preApprovedList.filter(v => v.expectedDate === 'Today').length;
  }

  allowEntry(visitor: PreApprovedVisitor) {
    this.preApproveService.markAsEntered(visitor.id);
    // In real app, this would also create a visitor log entry
    console.log('Visitor allowed entry:', visitor);
    alert(`Entry allowed for ${visitor.name} visiting ${visitor.flatNumber}`);
  }
}
