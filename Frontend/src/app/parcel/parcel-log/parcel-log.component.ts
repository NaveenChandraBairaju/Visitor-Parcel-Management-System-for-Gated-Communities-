import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ParcelService, Parcel } from '../../services/parcel.service';

@Component({
  selector: 'app-parcel-log',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, MatSelectModule, MatTableModule, MatIconModule
  ],
  templateUrl: './parcel-log.component.html',
  styleUrl: './parcel-log.component.css'
})
export class ParcelLogComponent {
  parcel = { courier: '', name: '', recipientName: '', flatNumber: '', description: '' };
  displayedColumns = ['courier', 'name', 'flatNumber', 'receivedTime'];
  recentParcels: Parcel[] = [];

  constructor(private parcelService: ParcelService) {
    this.parcelService.parcels$.subscribe(list => {
      this.recentParcels = list.slice(0, 10);
    });
  }

  submitParcel() {
    if (this.parcel.courier && this.parcel.name && this.parcel.flatNumber) {
      this.parcelService.addParcel({
        courier: this.parcel.courier,
        name: this.parcel.name,
        flatNumber: this.parcel.flatNumber,
        recipientName: this.parcel.recipientName,
        description: this.parcel.description
      });
      this.clearForm();
    }
  }

  clearForm() {
    this.parcel = { courier: '', name: '', recipientName: '', flatNumber: '', description: '' };
  }
}
