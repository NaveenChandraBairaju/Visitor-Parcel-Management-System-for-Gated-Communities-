import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FrequentVisitorService } from './frequent-visitor.service';
import { ActivityService } from './activity.service';

export interface Visitor {
  id: number;
  name: string;
  phone: string;
  purpose: string;
  flatNumber: string;
  vehicleNumber?: string;
  idProof?: string;
  photo?: string;
  checkIn: string;
  checkOut?: string;
  status: 'new' | 'waiting' | 'approved' | 'rejected' | 'entered' | 'exited';
  date: string;
  isFrequent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private frequentVisitorService = inject(FrequentVisitorService);
  private activityService = inject(ActivityService);
  private visitors = new BehaviorSubject<Visitor[]>([
    // A-101 visitors - various statuses (NO Delivery - those go to Parcel log)
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', purpose: 'Guest', flatNumber: 'A-101', checkIn: '10:30 AM', status: 'waiting', date: 'Today' },
    { id: 2, name: 'Suresh Reddy', phone: '9876543212', purpose: 'Maintenance', flatNumber: 'A-101', checkIn: '12:00 PM', status: 'entered', date: 'Today' },
    { id: 3, name: 'Anita Sharma', phone: '9876543213', purpose: 'Service', flatNumber: 'A-101', checkIn: '9:00 AM', status: 'rejected', date: 'Today' },
    { id: 4, name: 'Vikram Singh', phone: '9876543214', purpose: 'Guest', flatNumber: 'A-101', checkIn: '2:00 PM', status: 'waiting', date: 'Today' },
    { id: 5, name: 'Priya Verma', phone: '9876543215', purpose: 'Guest', flatNumber: 'A-101', checkIn: '3:00 PM', status: 'approved', date: 'Today' },
    // B-205 visitors
    { id: 6, name: 'Amit Patel', phone: '9876543216', purpose: 'Family', flatNumber: 'B-205', checkIn: '1:30 PM', status: 'waiting', date: 'Today' },
    { id: 7, name: 'Neha Gupta', phone: '9876543218', purpose: 'Guest', flatNumber: 'B-205', checkIn: '4:00 PM', status: 'approved', date: 'Today' }
  ]);

  visitors$ = this.visitors.asObservable();
  private nextId = 8;



  // Security logs new visitor - status: waiting (for resident approval)
  addVisitor(visitor: Partial<Visitor>) {
    const current = this.visitors.value;
    const newVisitor: Visitor = {
      id: this.nextId++,
      name: visitor.name || '',
      phone: visitor.phone || '',
      purpose: visitor.purpose || '',
      flatNumber: visitor.flatNumber || '',
      vehicleNumber: visitor.vehicleNumber,
      idProof: visitor.idProof,
      photo: visitor.photo,
      checkIn: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      status: 'waiting',
      date: 'Today'
    };
    this.visitors.next([newVisitor, ...current]);
    return newVisitor;
  }

  // Resident approves visitor
  approveVisitor(id: number) {
    const visitor = this.visitors.value.find(v => v.id === id);
    if (visitor) {
      this.activityService.addActivity('visitor_approved', `Visitor Approved - ${visitor.name}`, visitor.flatNumber);
    }
    this.updateStatus(id, 'approved');
  }

  // Resident rejects visitor
  rejectVisitor(id: number) {
    const visitor = this.visitors.value.find(v => v.id === id);
    if (visitor) {
      this.activityService.addActivity('visitor_rejected', `Visitor Rejected - ${visitor.name}`, visitor.flatNumber);
    }
    this.updateStatus(id, 'rejected');
  }

  // Security marks visitor as entered - also records visit for frequent visitors
  markEntered(id: number) {
    const visitor = this.visitors.value.find(v => v.id === id);
    if (visitor) {
      this.frequentVisitorService.recordVisit(visitor.phone, visitor.flatNumber);
      this.activityService.addActivity('visitor_entered', `Visitor Entry - ${visitor.name}`, visitor.flatNumber);
    }
    this.updateStatus(id, 'entered');
  }

  // Security marks visitor as exited
  markExited(id: number) {
    const visitor = this.visitors.value.find(v => v.id === id);
    if (visitor) {
      this.activityService.addActivity('visitor_exited', `Visitor Exit - ${visitor.name}`, visitor.flatNumber);
    }
    const current = this.visitors.value;
    const updated = current.map(v => v.id === id ? { 
      ...v, 
      status: 'exited' as const,
      checkOut: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    } : v);
    this.visitors.next(updated);
  }

  private updateStatus(id: number, status: Visitor['status']) {
    const current = this.visitors.value;
    const updated = current.map(v => v.id === id ? { ...v, status } : v);
    this.visitors.next(updated);
  }

  getVisitorsForFlat(flatNumber: string) {
    return this.visitors.value.filter(v => v.flatNumber === flatNumber);
  }

  getWaitingForFlat(flatNumber: string) {
    return this.visitors.value.filter(v => v.flatNumber === flatNumber && v.status === 'waiting');
  }

  getEnteredVisitors() {
    return this.visitors.value.filter(v => v.status === 'entered');
  }

  getApprovedVisitors() {
    return this.visitors.value.filter(v => v.status === 'approved');
  }

  getTodayCount() {
    return this.visitors.value.filter(v => v.date === 'Today').length;
  }

  getWaitingCount() {
    return this.visitors.value.filter(v => v.status === 'waiting').length;
  }
}
