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

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  displayedColumns = ['name', 'email', 'unit', 'role', 'status', 'actions'];
  searchQuery = '';
  filterRole = '';

  users = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', unit: 'A-101', role: 'resident', status: 'active' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', unit: 'B-205', role: 'resident', status: 'active' },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', unit: 'C-302', role: 'resident', status: 'inactive' },
    { id: 4, name: 'Suresh Singh', email: 'suresh@email.com', unit: 'Gate 1', role: 'security', status: 'active' },
    { id: 5, name: 'Ramesh Verma', email: 'ramesh@email.com', unit: 'Gate 2', role: 'security', status: 'active' },
    { id: 6, name: 'Neha Gupta', email: 'neha@email.com', unit: 'D-401', role: 'resident', status: 'active' },
    { id: 7, name: 'Vikram Reddy', email: 'vikram@email.com', unit: 'A-505', role: 'resident', status: 'active' },
    { id: 8, name: 'Admin User', email: 'admin@email.com', unit: 'Office', role: 'admin', status: 'active' }
  ];

  get residentCount() { return this.users.filter(u => u.role === 'resident').length; }
  get securityCount() { return this.users.filter(u => u.role === 'security').length; }
  get adminCount() { return this.users.filter(u => u.role === 'admin').length; }
  get activeCount() { return this.users.filter(u => u.status === 'active').length; }

  get filteredUsers() {
    return this.users.filter(u => {
      const matchesSearch = !this.searchQuery || 
        u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = !this.filterRole || u.role === this.filterRole;
      return matchesSearch && matchesRole;
    });
  }

  editUser(user: any) {
    console.log('Edit user:', user);
  }

  deleteUser(user: any) {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  toggleStatus(user: any) {
    user.status = user.status === 'active' ? 'inactive' : 'active';
  }
}
