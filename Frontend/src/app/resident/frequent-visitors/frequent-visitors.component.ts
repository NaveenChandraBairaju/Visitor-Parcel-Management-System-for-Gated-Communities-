import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FrequentVisitorService, FrequentVisitor } from '../../services/frequent-visitor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-frequent-visitors',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './frequent-visitors.component.html',
  styleUrl: './frequent-visitors.component.css'
})
export class FrequentVisitorsComponent {
  displayedColumns = ['name', 'phone', 'relation', 'visits', 'lastVisit', 'actions'];
  searchQuery = '';
  showAddForm = false;
  residentFlat: string;
  
  relationTypes = ['Family', 'Friend', 'Domestic Help', 'Driver', 'Other'];
  
  newVisitor = { name: '', phone: '', relation: '' };
  frequentVisitors: FrequentVisitor[] = [];
  showError = false;

  constructor(private frequentVisitorService: FrequentVisitorService, private authService: AuthService) {
    // Get logged-in user's flat
    this.residentFlat = this.authService.getUserFlat();
    
    // Subscribe to get real-time updates (visit counts update automatically)
    this.frequentVisitorService.frequentVisitors$.subscribe(list => {
      this.frequentVisitors = list.filter(v => v.flatNumber === this.residentFlat);
    });
  }

  get filteredVisitors() {
    if (!this.searchQuery) return this.frequentVisitors;
    return this.frequentVisitors.filter(v => 
      v.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      v.relation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get isFormValid(): boolean {
    return !!(
      this.newVisitor.name.trim() && 
      this.newVisitor.phone.length === 10 && 
      /^[0-9]{10}$/.test(this.newVisitor.phone) &&
      this.newVisitor.relation
    );
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addVisitor() {
    if (!this.isFormValid) {
      this.showError = true;
      return;
    }
    
    this.frequentVisitorService.addFrequentVisitor({
      name: this.newVisitor.name.trim(),
      phone: this.newVisitor.phone,
      relation: this.newVisitor.relation,
      flatNumber: this.residentFlat
    });
    
    this.resetForm();
    this.showAddForm = false;
  }

  resetForm() {
    this.newVisitor = { name: '', phone: '', relation: '' };
    this.showError = false;
  }

  removeVisitor(visitor: FrequentVisitor) {
    this.frequentVisitorService.removeFrequentVisitor(visitor.id);
  }
}
