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
  parcel = { 
    courier: '', 
    name: '', 
    recipientName: '', 
    flatNumber: '', 
    description: '',
    deliveryPersonName: '',
    deliveryPersonPhone: ''
  };
  displayedColumns = ['courier', 'name', 'flatNumber', 'receivedTime', 'deliveryStatus'];
  recentParcels: Parcel[] = [];

  constructor(private parcelService: ParcelService) {
    this.parcelService.parcels$.subscribe(list => {
      this.recentParcels = list.slice(0, 10);
    });
  }

  showError = false;

  get isFormValid(): boolean {
    return !!(
      this.parcel.courier && 
      this.parcel.name.trim() && 
      this.parcel.flatNumber.trim() &&
      this.parcel.deliveryPersonName.trim() &&
      this.parcel.deliveryPersonPhone.length === 10 &&
      /^[0-9]{10}$/.test(this.parcel.deliveryPersonPhone)
    );
  }

  submitParcel() {
    if (!this.isFormValid) {
      this.showError = true;
      return;
    }
    this.parcelService.addParcel({
      courier: this.parcel.courier,
      name: this.parcel.name.trim(),
      flatNumber: this.parcel.flatNumber.trim(),
      recipientName: this.parcel.recipientName.trim(),
      description: this.parcel.description,
      deliveryPersonName: this.parcel.deliveryPersonName.trim(),
      deliveryPersonPhone: this.parcel.deliveryPersonPhone
    });
    this.clearForm();
    this.showError = false;
  }

  markDeliveryLeft(parcel: Parcel) {
    this.parcelService.markDeliveryPersonLeft(parcel.id);
  }

  clearForm() {
    this.parcel = { 
      courier: '', 
      name: '', 
      recipientName: '', 
      flatNumber: '', 
      description: '',
      deliveryPersonName: '',
      deliveryPersonPhone: ''
    };
    this.showError = false;
  }
}
