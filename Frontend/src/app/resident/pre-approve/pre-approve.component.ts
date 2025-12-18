import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PreApproveService, PreApprovedVisitor } from '../../services/pre-approve.service';

@Component({
  selector: 'app-pre-approve',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSelectModule, MatTableModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './pre-approve.component.html',
  styleUrl: './pre-approve.component.css'
})
export class PreApproveComponent {
  visitor = { name: '', phone: '', purpose: '', expectedDate: null as Date | null, vehicleNumber: '' };
  displayedColumns = ['name', 'phone', 'purpose', 'expectedDate', 'status', 'actions'];
  preApprovedList: PreApprovedVisitor[] = [];

  // Simulated resident info (would come from auth service in real app)
  residentFlat = 'A-101';
  residentName = 'Rahul Sharma';

  constructor(private preApproveService: PreApproveService) {
    this.preApproveService.preApprovedList$.subscribe(list => {
      // Filter to show only this resident's pre-approvals
      this.preApprovedList = list.filter(v => v.flatNumber === this.residentFlat);
    });
  }

  submitPreApproval() {
    if (this.visitor.name && this.visitor.phone) {
      const expectedDate = this.visitor.expectedDate 
        ? new Date(this.visitor.expectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'Today';
      
      this.preApproveService.addPreApproval(
        { ...this.visitor, expectedDate },
        this.residentFlat,
        this.residentName
      );
      this.clearForm();
    }
  }

  clearForm() {
    this.visitor = { name: '', phone: '', purpose: '', expectedDate: null, vehicleNumber: '' };
  }

  cancelApproval(item: PreApprovedVisitor) {
    this.preApproveService.cancelApproval(item.id);
  }
}
