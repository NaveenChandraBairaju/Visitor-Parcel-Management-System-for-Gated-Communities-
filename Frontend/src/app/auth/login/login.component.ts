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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.role = params['role'];
      }
    });
  }

  login() {
    if (this.email && this.password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', this.role);

      switch (this.role) {
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
}
