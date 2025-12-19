import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivityService } from './activity.service';

export interface Parcel {
  id: number;
  courier: string;
  name: string;
  flatNumber: string;
  recipientName: string;
  receivedDate: string;
  receivedTime: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Acknowledged' | 'Collected';
  description?: string;
  // Delivery person tracking
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
  deliveryPersonArrived?: string;
  deliveryPersonLeft?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private activityService = inject(ActivityService);
  private parcels = new BehaviorSubject<Parcel[]>([
    // A-101 (resident@demo.com - Rahul Sharma) - Various statuses with delivery person tracking
    { id: 1, courier: 'Amazon', name: 'Electronics Package', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '19 Dec 2025', receivedTime: '10:30 AM', status: 'Pending', deliveryPersonName: 'Raju Kumar', deliveryPersonPhone: '9876543001', deliveryPersonArrived: '10:30 AM', deliveryPersonLeft: undefined },
    { id: 2, courier: 'Myntra', name: 'Clothing Delivery', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '19 Dec 2025', receivedTime: '11:00 AM', status: 'Pending', deliveryPersonName: 'Sunil Yadav', deliveryPersonPhone: '9876543002', deliveryPersonArrived: '11:00 AM', deliveryPersonLeft: undefined },
    { id: 3, courier: 'Flipkart', name: 'Mobile Accessories', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '18 Dec 2025', receivedTime: '2:30 PM', status: 'Approved', deliveryPersonName: 'Mohan Singh', deliveryPersonPhone: '9876543003', deliveryPersonArrived: '2:30 PM', deliveryPersonLeft: '2:45 PM' },
    { id: 4, courier: 'Swiggy', name: 'Instamart Groceries', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '17 Dec 2025', receivedTime: '4:00 PM', status: 'Collected', deliveryPersonName: 'Ramesh Verma', deliveryPersonPhone: '9876543004', deliveryPersonArrived: '4:00 PM', deliveryPersonLeft: '4:10 PM' },
    { id: 5, courier: 'Meesho', name: 'Home Decor Items', flatNumber: 'A-101', recipientName: 'Rahul Sharma', receivedDate: '16 Dec 2025', receivedTime: '1:15 PM', status: 'Rejected', deliveryPersonName: 'Anil Sharma', deliveryPersonPhone: '9876543005', deliveryPersonArrived: '1:15 PM', deliveryPersonLeft: '1:25 PM' },
    // B-205 (resident2@demo.com - Priya Patel)
    { id: 6, courier: 'Amazon', name: 'Books Order', flatNumber: 'B-205', recipientName: 'Priya Patel', receivedDate: '19 Dec 2025', receivedTime: '9:45 AM', status: 'Pending', deliveryPersonName: 'Vijay Patel', deliveryPersonPhone: '9876543006', deliveryPersonArrived: '9:45 AM', deliveryPersonLeft: undefined },
    { id: 7, courier: 'Flipkart', name: 'Fashion Order', flatNumber: 'B-205', recipientName: 'Priya Patel', receivedDate: '17 Dec 2025', receivedTime: '11:15 AM', status: 'Collected', deliveryPersonName: 'Kiran Das', deliveryPersonPhone: '9876543007', deliveryPersonArrived: '11:15 AM', deliveryPersonLeft: '11:30 AM' },
    // Other flats
    { id: 8, courier: 'BlueDart', name: 'Office Supplies', flatNumber: 'C-302', recipientName: 'Amit Kumar', receivedDate: '18 Dec 2025', receivedTime: '3:30 PM', status: 'Approved', deliveryPersonName: 'Sanjay Gupta', deliveryPersonPhone: '9876543008', deliveryPersonArrived: '3:30 PM', deliveryPersonLeft: '3:40 PM' },
    { id: 9, courier: 'Delhivery', name: 'Kitchen Appliances', flatNumber: 'D-401', recipientName: 'Neha Gupta', receivedDate: '15 Dec 2025', receivedTime: '2:45 PM', status: 'Collected', deliveryPersonName: 'Prakash Jha', deliveryPersonPhone: '9876543009', deliveryPersonArrived: '2:45 PM', deliveryPersonLeft: '3:00 PM' }
  ]);

  parcels$ = this.parcels.asObservable();
  private nextId = 10;



  addParcel(parcel: Partial<Parcel>) {
    const current = this.parcels.value;
    const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const newParcel: Parcel = {
      id: this.nextId++,
      courier: parcel.courier || 'Other',
      name: parcel.name || '',
      flatNumber: parcel.flatNumber || '',
      recipientName: parcel.recipientName || '',
      receivedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      receivedTime: now,
      status: 'Pending',
      description: parcel.description,
      deliveryPersonName: parcel.deliveryPersonName,
      deliveryPersonPhone: parcel.deliveryPersonPhone,
      deliveryPersonArrived: now,
      deliveryPersonLeft: undefined
    };
    this.parcels.next([newParcel, ...current]);
    this.activityService.addActivity('parcel_received', `Parcel Arrived - ${newParcel.courier} for ${newParcel.flatNumber}`, newParcel.flatNumber);
    return newParcel;
  }

  // Security marks delivery person as left
  markDeliveryPersonLeft(id: number) {
    const current = this.parcels.value;
    const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const updated = current.map(p => p.id === id ? { ...p, deliveryPersonLeft: now } : p);
    this.parcels.next(updated);
  }

  // Resident approves parcel
  approveParcel(id: number) {
    const parcel = this.parcels.value.find(p => p.id === id);
    if (parcel) {
      this.activityService.addActivity('parcel_received', `Parcel Approved - ${parcel.courier} Package`, parcel.flatNumber);
    }
    this.updateStatus(id, 'Approved');
  }

  // Resident rejects parcel
  rejectParcel(id: number) {
    const parcel = this.parcels.value.find(p => p.id === id);
    if (parcel) {
      this.activityService.addActivity('parcel_collected', `Parcel Rejected - ${parcel.courier} Package`, parcel.flatNumber);
    }
    this.updateStatus(id, 'Rejected');
  }

  // Resident acknowledges (ready to collect)
  acknowledgeParcel(id: number) {
    this.updateStatus(id, 'Acknowledged');
  }

  // Resident collected
  collectParcel(id: number) {
    const parcel = this.parcels.value.find(p => p.id === id);
    if (parcel) {
      this.activityService.addActivity('parcel_collected', `Parcel Collected - ${parcel.courier} Package`, parcel.flatNumber);
    }
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
    return this.parcels.value.filter(p => p.flatNumber === flatNumber && p.status === 'Pending');
  }

  getTodayCount() {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return this.parcels.value.filter(p => p.receivedDate === today || p.receivedDate === '18 Dec 2025').length;
  }

  getTotalCount() {
    return this.parcels.value.length;
  }
}
