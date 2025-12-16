import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-parcel-log',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './parcel-log.component.html',
  styleUrl: './parcel-log.component.css'
})
export class ParcelLogComponent {
  parcel = {
    name: '',
    recipientName: '',
    unitNumber: '',
    description: ''
  };

  submitParcel() {
    console.log('Parcel logged:', this.parcel);
  }

  clearForm() {
    this.parcel = { name: '', recipientName: '', unitNumber: '', description: '' };
  }
}
