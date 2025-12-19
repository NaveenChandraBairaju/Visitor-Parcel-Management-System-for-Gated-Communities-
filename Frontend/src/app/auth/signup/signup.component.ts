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
  agreeTerms = false;
  showError = false;
  errorMessage = '';

  constructor(private router: Router) {}

  get isFormValid(): boolean {
    return !!(
      this.fullName.trim() &&
      this.email.trim() &&
      this.isValidEmail(this.email) &&
      this.phone.length === 10 &&
      /^[0-9]{10}$/.test(this.phone) &&
      this.flatNumber.trim() &&
      this.role &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword &&
      this.agreeTerms
    );
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  signup() {
    this.showError = true;
    
    if (!this.fullName.trim()) {
      this.errorMessage = 'Please enter your full name';
      return;
    }
    if (!this.email.trim() || !this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    if (this.phone.length !== 10 || !/^[0-9]{10}$/.test(this.phone)) {
      this.errorMessage = 'Phone number must be 10 digits';
      return;
    }
    if (!this.flatNumber.trim()) {
      this.errorMessage = 'Please enter your flat/unit number';
      return;
    }
    if (!this.role) {
      this.errorMessage = 'Please select a role';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the Terms & Conditions';
      return;
    }

    // Store user data
    const userData = {
      fullName: this.fullName.trim(),
      email: this.email.trim(),
      phone: this.phone,
      flatNumber: this.flatNumber.trim(),
      role: this.role
    };
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', this.fullName);
    localStorage.setItem('userFlat', this.flatNumber);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate based on role
    if (userData.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (userData.role === 'security') {
      this.router.navigate(['/security/home']);
    } else {
      this.router.navigate(['/resident/home']);
    }
  }
}
