import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fullName = '';
  email = '';
  phone = '';
  flatNumber = '';
  role = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private router: Router) {}

  signup() {
    if (this.fullName && this.email && this.password && this.password === this.confirmPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', this.role || 'resident');
      this.router.navigate(['/dashboard/admin']);
    }
  }
}
