import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Visitor {
  id: number;
  name: string;
  phone: string;
  purpose: string;
  flatNumber: string;
  vehicleNumber?: string;
  checkIn: string;
  checkOut?: string;
  status: 'pending' | 'approved' | 'rejected' | 'inside' | 'checked-out';
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private visitors = new BehaviorSubject<Visitor[]>([
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', purpose: 'Guest', flatNumber: 'A-101', checkIn: '10:30 AM', status: 'inside', date: 'Today' },
    { id: 2, name: 'Meera Patel', phone: '9876543211', purpose: 'Delivery', flatNumber: 'B-205', checkIn: '11:15 AM', status: 'inside', date: 'Today' },
    { id: 3, name: 'Suresh Reddy', phone: '9876543212', purpose: 'Maintenance', flatNumber: 'C-302', checkIn: '12:00 PM', status: 'approved', date: 'Today' },
    { id: 4, name: 'Anita Sharma', phone: '9876543213', purpose: 'Service', flatNumber: 'A-404', checkIn: '9:00 AM', status: 'rejected', date: 'Today' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', purpose: 'Guest', flatNumber: 'B-102', checkIn: '2:00 PM', status: 'pending', date: 'Today' }
  ]);

  visitors$ = this.visitors.asObservable();
  private nextId = 6;

  addVisitor(visitor: Partial<Visitor>) {
    const current = this.visitors.value;
    const newVisitor: Visitor = {
      id: this.nextId++,
      name: visitor.name || '',
      phone: visitor.phone || '',
      purpose: visitor.purpose || '',
      flatNumber: visitor.flatNumber || '',
      vehicleNumber: visitor.vehicleNumber,
      checkIn: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      status: 'pending',
      date: 'Today'
    };
    this.visitors.next([newVisitor, ...current]);
    return newVisitor;
  }

  approveVisitor(id: number) {
    this.updateStatus(id, 'approved');
  }

  rejectVisitor(id: number) {
    this.updateStatus(id, 'rejected');
  }

  checkInVisitor(id: number) {
    this.updateStatus(id, 'inside');
  }

  checkOutVisitor(id: number) {
    const current = this.visitors.value;
    const updated = current.map(v => v.id === id ? { 
      ...v, 
      status: 'checked-out' as const,
      checkOut: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    } : v);
    this.visitors.next(updated);
  }

  private updateStatus(id: number, status: Visitor['status']) {
    const current = this.visitors.value;
    const updated = current.map(v => v.id === id ? { ...v, status } : v);
    this.visitors.next(updated);
  }

  getPendingForFlat(flatNumber: string) {
    return this.visitors.value.filter(v => v.flatNumber === flatNumber && v.status === 'pending');
  }

  getInsideVisitors() {
    return this.visitors.value.filter(v => v.status === 'inside');
  }

  getTodayCount() {
    return this.visitors.value.filter(v => v.date === 'Today').length;
  }

  getPendingCount() {
    return this.visitors.value.filter(v => v.status === 'pending').length;
  }
}
