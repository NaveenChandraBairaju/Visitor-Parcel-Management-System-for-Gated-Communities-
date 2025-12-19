import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FrequentVisitor {
  id: number;
  name: string;
  phone: string;
  relation: string;
  flatNumber: string;
  visits: number;
  lastVisit: string;
}

@Injectable({
  providedIn: 'root'
})
export class FrequentVisitorService {
  private nextId = 6;
  
  private frequentVisitors = new BehaviorSubject<FrequentVisitor[]>([
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', relation: 'Friend', flatNumber: 'A-101', visits: 15, lastVisit: '17 Dec 2025' },
    { id: 2, name: 'Meera Patel', phone: '9876543211', relation: 'Family', flatNumber: 'A-101', visits: 28, lastVisit: '16 Dec 2025' },
    { id: 3, name: 'Suresh - Maid', phone: '9876543212', relation: 'Domestic Help', flatNumber: 'A-101', visits: 45, lastVisit: '18 Dec 2025' },
    { id: 4, name: 'Ravi - Driver', phone: '9876543213', relation: 'Driver', flatNumber: 'A-101', visits: 60, lastVisit: '18 Dec 2025' },
    { id: 5, name: 'Amazon Delivery', phone: '1800123456', relation: 'Delivery', flatNumber: 'A-101', visits: 12, lastVisit: '15 Dec 2025' }
  ]);

  frequentVisitors$ = this.frequentVisitors.asObservable();

  // Get frequent visitors for a specific flat
  getForFlat(flatNumber: string): FrequentVisitor[] {
    return this.frequentVisitors.value.filter(v => v.flatNumber === flatNumber);
  }

  // Add new frequent visitor
  addFrequentVisitor(visitor: Partial<FrequentVisitor>): FrequentVisitor {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newVisitor: FrequentVisitor = {
      id: this.nextId++,
      name: visitor.name || '',
      phone: visitor.phone || '',
      relation: visitor.relation || 'Other',
      flatNumber: visitor.flatNumber || 'A-101',
      visits: 0,
      lastVisit: today
    };
    this.frequentVisitors.next([newVisitor, ...this.frequentVisitors.value]);
    return newVisitor;
  }

  // Remove frequent visitor
  removeFrequentVisitor(id: number) {
    const updated = this.frequentVisitors.value.filter(v => v.id !== id);
    this.frequentVisitors.next(updated);
  }

  // Check if visitor is in frequent list (by phone)
  isFrequentVisitor(phone: string, flatNumber: string): FrequentVisitor | undefined {
    return this.frequentVisitors.value.find(
      v => v.phone === phone && v.flatNumber === flatNumber
    );
  }

  // Increment visit count when visitor enters
  recordVisit(phone: string, flatNumber: string) {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const updated = this.frequentVisitors.value.map(v => {
      if (v.phone === phone && v.flatNumber === flatNumber) {
        return { ...v, visits: v.visits + 1, lastVisit: today };
      }
      return v;
    });
    this.frequentVisitors.next(updated);
  }
}
