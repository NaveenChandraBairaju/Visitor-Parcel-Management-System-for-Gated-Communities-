import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  template: `
    <div class="unauthorized-container">
      <h1>403 - Unauthorized</h1>
      <p>You don't have permission to access this page.</p>
      <button mat-raised-button color="primary" routerLink="/admin/dashboard">
        Go to Dashboard
      </button>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }

    h1 {
      font-size: 48px;
      margin-bottom: 16px;
    }

    p {
      font-size: 18px;
      margin-bottom: 24px;
    }
  `]
})
export class UnauthorizedComponent {}
