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
    { id: 1, title: 'Water Supply Maintenance', message: 'Water supply will be interrupted on 20th Dec from 10 AM to 2 PM.', priority: 'high', audience: 'All Residents', date: '18 Dec 2025', author: 'Admin' },
    { id: 2, title: 'New Security Protocol', message: 'All visitors must show ID proof at the gate.', priority: 'normal', audience: 'All Residents', date: '17 Dec 2025', author: 'Admin' },
    { id: 3, title: 'Holiday Schedule', message: 'Security shift timings will change during Christmas holidays.', priority: 'low', audience: 'Security Guards', date: '16 Dec 2025', author: 'Admin' }
  ]);

  announcements$ = this.announcements.asObservable();
  private nextId = 4;

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
