import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Parcel {
  id: number;
  courier: string;
  name: string;
  flatNumber: string;
  recipientName: string;
  receivedDate: string;
  receivedTime: string;
  status: 'Received' | 'Acknowledged' | 'Collected';
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private parcels = new BehaviorSubject<Parcel[]>([
    { id: 1, courier: 'Amazon', name: 'Electronics Package', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '18 Dec 2025', receivedTime: '10:30 AM', status: 'Received' },
    { id: 2, courier: 'Flipkart', name: 'Fashion Order', flatNumber: 'B-205', recipientName: 'Priya Patel', receivedDate: '17 Dec 2025', receivedTime: '11:15 AM', status: 'Collected' },
    { id: 3, courier: 'Myntra', name: 'Clothing Delivery', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '18 Dec 2025', receivedTime: '12:00 PM', status: 'Received' },
    { id: 4, courier: 'Swiggy', name: 'Instamart Groceries', flatNumber: 'C-302', recipientName: 'Amit Kumar', receivedDate: '16 Dec 2025', receivedTime: '1:30 PM', status: 'Acknowledged' },
    { id: 5, courier: 'Meesho', name: 'Home Decor Items', flatNumber: 'D-401', recipientName: 'Neha Gupta', receivedDate: '15 Dec 2025', receivedTime: '2:45 PM', status: 'Collected' }
  ]);

  parcels$ = this.parcels.asObservable();
  private nextId = 6;

  addParcel(parcel: Partial<Parcel>) {
    const current = this.parcels.value;
    const newParcel: Parcel = {
      id: this.nextId++,
      courier: parcel.courier || 'Other',
      name: parcel.name || '',
      flatNumber: parcel.flatNumber || '',
      recipientName: parcel.recipientName || '',
      receivedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      receivedTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      status: 'Received',
      description: parcel.description
    };
    this.parcels.next([newParcel, ...current]);
    return newParcel;
  }

  acknowledgeParcel(id: number) {
    this.updateStatus(id, 'Acknowledged');
  }

  collectParcel(id: number) {
    this.updateStatus(id, 'Collected');
  }

  private updateStatus(id: number, status: Parcel['status']) {
    const current = this.parcels.value;
    const updated = current.map(p => p.id === id ? { ...p, status } : p);
    this.parcels.next(updated);
  }

  getParcelsForFlat(flatNumber: string) {
    return this.parcels.value.filter(p => p.flatNumber === flatNumber);
  }

  getPendingForFlat(flatNumber: string) {
    return this.parcels.value.filter(p => p.flatNumber === flatNumber && p.status === 'Received');
  }

  getTodayCount() {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return this.parcels.value.filter(p => p.receivedDate === today || p.receivedDate === '18 Dec 2025').length;
  }

  getTotalCount() {
    return this.parcels.value.length;
  }
}
