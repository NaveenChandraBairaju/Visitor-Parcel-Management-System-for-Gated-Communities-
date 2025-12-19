import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Announcement {
  id: number;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high';
  audience: string;
  date: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcements = new BehaviorSubject<Announcement[]>([
    { id: 1, title: 'Water Supply Maintenance', message: 'Water supply will be interrupted on 20th Dec from 10 AM to 2 PM for tank cleaning. Please store water accordingly.', priority: 'high', audience: 'All Residents', date: '19 Dec 2025', author: 'Admin' },
    { id: 2, title: 'Elevator Maintenance Notice', message: 'Elevator in Block A will be under maintenance on 21st Dec. Please use stairs or Block B elevator.', priority: 'high', audience: 'All Residents', date: '19 Dec 2025', author: 'Admin' },
    { id: 3, title: 'New Visitor Entry Protocol', message: 'All visitors must show valid ID proof and get OTP verification from residents before entry. Effective from 22nd Dec.', priority: 'normal', audience: 'All Residents', date: '18 Dec 2025', author: 'Admin' },
    { id: 4, title: 'Security Shift Changes - Christmas', message: 'Security shift timings will change during Christmas holidays (24-26 Dec). Day shift: 6 AM - 6 PM, Night shift: 6 PM - 6 AM.', priority: 'normal', audience: 'Security Guards', date: '18 Dec 2025', author: 'Admin' },
    { id: 5, title: 'Monthly Maintenance Due', message: 'Monthly maintenance charges for December are due by 25th Dec. Late payment will attract 2% penalty.', priority: 'normal', audience: 'Residents Only', date: '17 Dec 2025', author: 'Admin' },
    { id: 6, title: 'Parking Area Repainting', message: 'Parking area lines will be repainted on 22nd Dec. Please park vehicles outside the society from 8 AM to 5 PM.', priority: 'normal', audience: 'All Residents', date: '17 Dec 2025', author: 'Admin' },
    { id: 7, title: 'New Year Celebration', message: 'Society New Year celebration on 31st Dec at 8 PM in the clubhouse. All residents are invited with family.', priority: 'low', audience: 'All Residents', date: '16 Dec 2025', author: 'Admin' },
    { id: 8, title: 'Gate Pass System Update', message: 'New digital gate pass system will be implemented from 1st Jan. Training session for security on 28th Dec at 10 AM.', priority: 'normal', audience: 'Security Guards', date: '15 Dec 2025', author: 'Admin' }
  ]);

  announcements$ = this.announcements.asObservable();
  private nextId = 9;

  addAnnouncement(data: Partial<Announcement>) {
    const current = this.announcements.value;
    const newAnnouncement: Announcement = {
      id: this.nextId++,
      title: data.title || '',
      message: data.message || '',
      priority: data.priority || 'normal',
      audience: data.audience || 'All Residents',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Admin'
    };
    this.announcements.next([newAnnouncement, ...current]);
  }

  deleteAnnouncement(id: number) {
    const current = this.announcements.value;
    this.announcements.next(current.filter(a => a.id !== id));
  }

  getForAudience(audience: string) {
    return this.announcements.value.filter(a => 
      a.audience === 'All Residents' || a.audience === audience
    );
  }
}
