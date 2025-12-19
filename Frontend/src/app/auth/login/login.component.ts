import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  role = 'resident';
  hidePassword = true;
  errorMessage = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.role = params['role'];
      }
    });
  }

  getBrandIcon(): string {
    switch (this.role) {
      case 'resident': return 'home';
      case 'security': return 'shield';
      case 'admin': return 'admin_panel_settings';
      default: return 'shield';
    }
  }

  getBrandName(): string {
    switch (this.role) {
      case 'resident': return 'Resident Portal';
      case 'security': return 'Security Portal';
      case 'admin': return 'Admin Portal';
      default: return 'SecureGate';
    }
  }

  getWelcomeText(): string {
    switch (this.role) {
      case 'resident': return 'Welcome Home!';
      case 'security': return 'Guard Station';
      case 'admin': return 'Admin Access';
      default: return 'Welcome Back!';
    }
  }

  getSubText(): string {
    switch (this.role) {
      case 'resident': return 'Manage your visitors and parcels';
      case 'security': return 'Secure the community entrance';
      case 'admin': return 'Manage the entire community';
      default: return 'Sign in to access your portal';
    }
  }

  getRightIcon(): string {
    switch (this.role) {
      case 'resident': return 'family_restroom';
      case 'security': return 'verified_user';
      case 'admin': return 'settings';
      default: return 'verified_user';
    }
  }

  getRightTitle(): string {
    switch (this.role) {
      case 'resident': return 'Your Home, Your Control';
      case 'security': return 'Protect & Serve';
      case 'admin': return 'Full Control';
      default: return 'Secure Access';
    }
  }

  getRightText(): string {
    switch (this.role) {
      case 'resident': return 'Approve visitors and track parcels from anywhere';
      case 'security': return 'Keep the community safe and secure';
      case 'admin': return 'Monitor and manage all community operations';
      default: return 'Your community\'s safety is our priority';
    }
  }

  // Demo users for testing
  private demoUsers: Record<string, { name: string; flat: string; role: string }> = {
    'resident@demo.com': { name: 'Rahul Sharma', flat: 'A-101', role: 'resident' },
    'resident2@demo.com': { name: 'Priya Patel', flat: 'B-205', role: 'resident' },
    'security@demo.com': { name: 'Security Guard', flat: '', role: 'security' },
    'admin@demo.com': { name: 'Admin User', flat: '', role: 'admin' }
  };

  login() {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    // Check if demo user exists
    const demoUser = this.demoUsers[this.email.toLowerCase()];
    
    if (demoUser) {
      // Demo user found - validate role matches selected portal
      if (demoUser.role !== this.role) {
        this.errorMessage = `Invalid credentials. This account is for ${demoUser.role} portal.`;
        return;
      }
      
      // Valid demo user login
      const userData = {
        fullName: demoUser.name,
        flatNumber: demoUser.flat,
        role: demoUser.role
      };

      this.setUserAndNavigate(userData);
    } else {
      // Unknown email - show error (in real app, would check backend)
      this.errorMessage = 'Invalid email or password. Try demo accounts: resident@demo.com, security@demo.com, admin@demo.com';
    }
  }

  private setUserAndNavigate(userData: { fullName: string; flatNumber: string; role: string }) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.fullName);
    localStorage.setItem('userFlat', userData.flatNumber);
    localStorage.setItem('userData', JSON.stringify(userData));

    switch (userData.role) {
      case 'resident':
        this.router.navigate(['/resident']);
        break;
      case 'security':
        this.router.navigate(['/security']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
