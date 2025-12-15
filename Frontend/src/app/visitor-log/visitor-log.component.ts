import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-visitor-log',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Visitor Log</h2>
    <mat-form-field>
      <mat-label>Visitor Name</mat-label>
      <input matInput>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Purpose</mat-label>
      <input matInput>
    </mat-form-field>
    <button mat-raised-button color="primary">Submit</button>
  `,
  styles: []
})
export class VisitorLogComponent {}
